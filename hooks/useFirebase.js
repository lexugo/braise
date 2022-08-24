import { initializeApp, getApps, FirebaseOptions, FirebaseApp } from 'firebase/app'

/**
 * Initializes or gets the Firebase app.
 * @param {FirebaseOptions?} config Options to configure the app's services
 * @returns {FirebaseApp} The initialized app.
 */
export default function useFirebase(config) {
	if (typeof window === 'undefined')
		return // Don't initialize app on server side

	if (getApps().length)
		return getApps()[0] // Already initialized

	console.debug('Initializing Firebase') // TODO: Hide in production
	return initializeApp(config ?? {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
	})
}
