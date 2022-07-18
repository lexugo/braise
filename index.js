import { getFirestore } from 'firebase/firestore'

// Export hooks
export const useFirestore = getFirestore
export { useSnapshot } from './hooks/useSnapshot'
