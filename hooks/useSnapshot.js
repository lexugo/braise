import { useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'

export default function useSnapshot(reference, callback, dependencies) {
	return useEffect(() => onSnapshot(reference, callback), dependencies)
}
