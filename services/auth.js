import {
	getRedirectResult,
	linkWithRedirect, signInWithRedirect, signOut as signOutWithAuth,
	getAuth,
	GoogleAuthProvider,
	setPersistence, browserLocalPersistence
} from 'firebase/auth'

const google = new GoogleAuthProvider()

export const signInWithGoogle = signInWith(google)
function signInWith(provider) {
	return async function(auth = getAuth()) {
		if (await getRedirectResult(auth)) return // Successfully signed in

		await setPersistence(auth, browserLocalPersistence)
		if (!auth.currentUser) {
			console.debug('Signing in with', provider.providerId)
			await signInWithRedirect(auth, provider)
		} else if (!auth.currentUser.providerData.find(({ providerId }) => providerId === provider.providerId)) {
			console.debug(`Linking ${auth.currentUser.providerId} account with ${provider.providerId}`)
			await linkWithRedirect(auth.currentUser, provider) // Link with existing account
		}
	}
}

export const signOut = auth => signOutWithAuth(auth ?? getAuth())
