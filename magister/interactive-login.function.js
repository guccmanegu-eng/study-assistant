/*
 *   -= Magiscore =-
 * Interactive login for Google-SSO (federated) Magister tenants.
 *
 * Confirmed flow (from a live network trace):
 *   Magister /connect/authorize  (client M6LOAPP, response_type "code id_token",
 *   response_mode fragment, PKCE S256)
 *     -> redirects to Google "Sign in with Google" (GeneralOAuthFlow consent)
 *     -> Google redirects back to Magister with its result
 *     -> Magister issues the app code and redirects to m6loapp://oauth2redirect/#code=...
 *
 * We open a real browser, let the human complete Google consent, and capture the
 * code the instant Magister tries to redirect to the m6loapp:// custom scheme
 * (the browser can't load it, but CDP reports the attempt). Tokens are then
 * exchanged with the SAME client/redirect/PKCE/X-API-Client-ID as your existing
 * login.function.js, so the downstream refresh + grades pipeline is unchanged.
 *
 * Baked-in learnings:
 *  - response_type MUST be "code id_token" (plain "code" -> unauthorized_client
 *    "Invalid grant type for client" for M6LOAPP).
 *  - NEVER use request interception (req.continue re-issues Google's consent
 *    requests and yields a Google 400). We only OBSERVE via CDP.
 *  - Persist a user-data-dir so the existing Google session is reused and the
 *    consent screen isn't re-prompted every run.
 */

'use strict';

const os = require('os');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const ISSUER_URL = 'https://accounts.magister.net';
const CLIENT_ID = 'M6LOAPP';
const REDIRECT_URI = 'm6loapp://oauth2redirect/';
const API_CLIENT_ID = 'EF15';

const DEFAULT_RESPONSE_TYPE = 'code id_token';
const DEFAULT_RESPONSE_MODE = 'fragment';
const DEFAULT_SCOPE = 'openid profile offline_access';

function base64url(buf) {
	return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function randomString(bytes = 32) {
	return base64url(crypto.randomBytes(bytes));
}
function codeChallengeFromVerifier(verifier) {
	return base64url(crypto.createHash('sha256').update(verifier).digest());
}

async function fetchOpenidConfig() {
	try {
		const res = await fetch(`${ISSUER_URL}/.well-known/openid-configuration`);
		if (!res.ok) return null;
		return res.json();
	} catch (_) {
		return null;
	}
}

function buildAuthorizationUrl({
	tenant, codeChallenge, state, nonce, scope, responseType, responseMode, authorizationEndpoint,
}) {
	const params = new URLSearchParams({
		client_id: CLIENT_ID,
		redirect_uri: REDIRECT_URI,
		response_type: responseType || DEFAULT_RESPONSE_TYPE,
		response_mode: responseMode || DEFAULT_RESPONSE_MODE,
		scope: scope || DEFAULT_SCOPE,
		code_challenge: codeChallenge,
		code_challenge_method: 'S256',
		acr_values: `tenant:${tenant}.magister.net`,
		state,
		nonce,
		prompt: 'select_account',
	});
	const base = authorizationEndpoint || `${ISSUER_URL}/connect/authorize`;
	return `${base}?${params.toString()}`;
}

async function exchangeCodeForTokens(code, codeVerifier) {
	const body = new URLSearchParams({
		code,
		redirect_uri: REDIRECT_URI,
		client_id: CLIENT_ID,
		grant_type: 'authorization_code',
		code_verifier: codeVerifier,
	}).toString();

	const res = await fetch(`${ISSUER_URL}/connect/token`, {
		method: 'POST',
		headers: {
			'X-API-Client-ID': API_CLIENT_ID,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
	});
	if (!res.ok) {
		throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
	}
	return res.json();
}

function parseRedirect(url) {
	const out = { code: null, error: null, errorDescription: null };
	const parts = [];
	const hashIndex = url.indexOf('#');
	const qIndex = url.indexOf('?');
	if (hashIndex !== -1) parts.push(url.slice(hashIndex + 1));
	if (qIndex !== -1) parts.push(url.slice(qIndex + 1, hashIndex === -1 ? undefined : hashIndex));
	for (const part of parts) {
		const sp = new URLSearchParams(part);
		if (sp.get('code')) out.code = sp.get('code');
		if (sp.get('error')) out.error = sp.get('error');
		if (sp.get('error_description')) out.errorDescription = sp.get('error_description');
	}
	return out;
}

module.exports = async function interactiveLogin({
	school,
	scope,
	responseType,
	responseMode,
	headless = false,
	timeout = 240000,
	userDataDir = path.join(os.tmpdir(), 'magiscore-login-profile'),
	dumpTrace = true,
} = {}) {
	if (!school) throw new Error('school (tenant) is required');

	const config = await fetchOpenidConfig();
	if (config && Array.isArray(config.scopes_supported) && !scope) {
		const want = DEFAULT_SCOPE.split(' ');
		const allowed = want.filter((s) => config.scopes_supported.includes(s));
		if (allowed.length) scope = allowed.join(' ');
	}

	const codeVerifier = randomString(32);
	const codeChallenge = codeChallengeFromVerifier(codeVerifier);
	const state = randomString(16);
	const nonce = randomString(16);

	const authUrl = buildAuthorizationUrl({
		tenant: school,
		codeChallenge,
		state,
		nonce,
		scope,
		responseType,
		responseMode,
		authorizationEndpoint: config && config.authorization_endpoint,
	});

	const browser = await puppeteer.launch({
		headless,
		userDataDir, // reuse the existing Google session; avoids re-consent loops
		args: ['--no-first-run', '--no-default-browser-check'],
	});

	// Keep a small ring buffer of recent request URLs so, if we fail, we can show
	// exactly where the flow died instead of guessing.
	const trace = [];

	try {
		const page = (await browser.pages())[0] || (await browser.newPage());

		const code = await new Promise(async (resolve, reject) => {
			const timer = setTimeout(
				() => {
					if (dumpTrace) {
						// eslint-disable-next-line no-console
						console.error('[magiscore] login timed out. Last URLs seen:\n' + trace.slice(-15).join('\n'));
					}
					reject(new Error('Login timed out waiting for redirect'));
				},
				timeout
			);

			const handle = (url) => {
				if (!url) return false;
				trace.push(url.length > 300 ? url.slice(0, 300) + '…' : url);
				if (url.indexOf('code=') === -1 && url.indexOf('error=') === -1) return false;
				const { code, error, errorDescription } = parseRedirect(url);
				if (error) {
					clearTimeout(timer);
					reject(new Error(`OAuth error: ${error} - ${errorDescription || ''}`));
					return true;
				}
				if (code) {
					clearTimeout(timer);
					resolve(code);
					return true;
				}
				return false;
			};

			// OBSERVE ONLY. Watch every request on every frame via CDP — the
			// m6loapp:// redirect target shows up here even though the browser
			// refuses to navigate to the custom scheme.
			const client = await page.target().createCDPSession();
			await client.send('Network.enable');
			client.on('Network.requestWillBeSent', (event) => {
				const url = event.request && event.request.url;
				if (
					url &&
					(url.startsWith(REDIRECT_URI) ||
						url.indexOf('redirect_callback.html') !== -1 ||
						url.indexOf('#code=') !== -1)
				) {
					handle(url);
				}
			});

			page.on('framenavigated', (frame) => handle(frame.url()));

			page.goto(authUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
		});

		const tokens = await exchangeCodeForTokens(code, codeVerifier);
		tokens.code_verifier = codeVerifier;
		return tokens;
	} finally {
		await browser.close().catch(() => {});
	}
};

module.exports.fetchOpenidConfig = fetchOpenidConfig;
module.exports.buildAuthorizationUrl = buildAuthorizationUrl;
module.exports.exchangeCodeForTokens = exchangeCodeForTokens;
module.exports.parseRedirect = parseRedirect;
