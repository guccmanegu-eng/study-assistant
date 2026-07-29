/*
 * End-to-end example: interactive login -> tokens -> your existing grades flow.
 *
 * Run once interactively to get tokens. Store refresh_token + person_id. After
 * that, your existing grades.function.js refreshes headlessly forever (until the
 * refresh token expires), so you only open a browser on first login / re-auth.
 */

'use strict';

const interactiveLogin = require('./interactive-login.function');

// Your existing grades handler already accepts { refresh, person_id, school }
// and calls connect/token with grant_type=refresh_token. Import it as-is:
// const grades = require('./grades.function');

async function main() {
	const school = process.env.MAGISTER_SCHOOL || 'kajmunk';

	// 1) First-time / re-auth: human completes Google SSO in the opened browser.
	const tokens = await interactiveLogin({ school, headless: false });

	console.log('access_token (short-lived):', tokens.access_token?.slice(0, 12) + '...');
	console.log('refresh_token (persist this):', tokens.refresh_token?.slice(0, 12) + '...');

	// 2) You still need person_id. Fetch it from the account endpoint once, the
	//    same way grades.function.js does, then store it alongside refresh_token.
	const account = await fetch(`https://${school}.magister.net/api/account?noCache=0`, {
		headers: {
			accept: 'application/json, text/plain, */*',
			authorization: 'Bearer ' + tokens.access_token,
		},
	}).then((r) => r.json());

	const personId = account?.Persoon?.Id;
	console.log('person_id (persist this):', personId);

	// 3) From here your pipeline is UNCHANGED. On every later request just pass
	//    { refresh: <refresh_token>, person_id, school } to your grades handler:
	//
	//    grades({ refresh: tokens.refresh_token, person_id: personId, school }, res)
	//
	//    grades.function.js -> refreshToken() -> getCourses()/getGrades()/... all
	//    keep working exactly as before, because the token is a normal Magister
	//    OAuth token regardless of whether the user logged in with a password or
	//    with Google.
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
