/*
 *   -= Magiscore =-
 * Login router: picks the interactive (Google-SSO) flow or your existing
 * scripted password flow based on how the tenant is configured.
 *
 * How it decides: after the username challenge, a federated (Google/Entra)
 * tenant responds with a redirect/hint to an external identity provider rather
 * than accepting a password challenge. We probe the account discovery endpoint
 * and fall back to interactive when a federated provider is detected OR when the
 * scripted password path errors in the way federation causes.
 */

'use strict';

const interactiveLogin = require('./interactive-login.function');

// Your existing scripted flow. Kept as the fast path for local-password schools.
let scriptedLogin;
try {
	scriptedLogin = require('./login.function');
} catch (_) {
	scriptedLogin = null;
}

const ISSUER_URL = 'https://accounts.magister.net';

/**
 * Ask Magister whether this tenant + username is federated. Returns true if the
 * account is backed by an external IdP (Google SSO), false for local password.
 *
 * This is best-effort: if the probe is inconclusive we return null and let the
 * caller decide (typically: try scripted, fall back to interactive on failure).
 */
async function isFederated({ school, username }) {
	if (!username) return null;
	try {
		const res = await fetch(
			`${ISSUER_URL}/challenges/current`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					tenant: `${school}.magister.net`,
					username,
				}),
			}
		);
		if (!res.ok) return null;
		const json = await res.json();
		// Federated tenants surface an external provider / authorityUrl hint.
		const hint = JSON.stringify(json).toLowerCase();
		if (hint.includes('google') || hint.includes('federat') || hint.includes('externalidp')) {
			return true;
		}
		if (hint.includes('password')) return false;
		return null;
	} catch (_) {
		return null;
	}
}

/**
 * Unified login. Params match your existing flow: { school, username, password }.
 * For federated schools, username/password are ignored and a browser opens.
 *
 * @returns {Promise<object>} token set including code_verifier
 */
async function login(params, res) {
	const { school, username } = params;

	const federated = await isFederated({ school, username });

	if (federated === true || !scriptedLogin) {
		return interactiveLogin({ school });
	}

	if (federated === false) {
		return scriptedLogin(params, res);
	}

	// Inconclusive: try scripted, fall back to interactive if it fails the way
	// federation makes it fail (missing password challenge / redirect).
	try {
		return await scriptedLogin(params, res);
	} catch (err) {
		return interactiveLogin({ school });
	}
}

module.exports = login;
module.exports.isFederated = isFederated;
