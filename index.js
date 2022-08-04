import { getFirestore } from 'firebase/firestore'

// Export hooks
export { default as useFirebase } from './hooks/useFirebase'
export const useFirestore = getFirestore
export { default as useSnapshot } from './hooks/useSnapshot'
export { default as useCollection } from './hooks/useCollection'
