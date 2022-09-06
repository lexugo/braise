import {
	getRedirectResult,
	signInWithRedirect, signOut as signOutWithAuth,
	getAuth,
	GoogleAuthProvider,
	setPersistence, browserLocalPersistence
} from 'firebase/auth'

const google = new GoogleAuthProvider()

export const signInWithGoogle = signInWith(google)
function signInWith(provider) {
	return async function(auth = getAuth()) {
		if (await getRedirectResult(auth)) return // Already signed in

		if (!auth.currentUser) {
			console.debug('Signing in with', provider.providerId)
			await setPersistence(auth, browserLocalPersistence)
			await signInWithRedirect(auth, provider)
		}
	}
}

export const signOut = auth => signOutWithAuth(auth ?? getAuth())
