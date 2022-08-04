import { collection, getFirestore, query } from 'firebase/firestore'

import { useMemo, useState } from 'react'
import useSnapshot from './useSnapshot'

function useCollection(path, ...constraints) {
	const reference = useMemo(() => {
		if (!constraints.every(Boolean)) return // An undefined contraint would yield an invalid query
		return query(collection(getFirestore(), path), ...constraints)
	}, [path, ...constraints])

	const [documents, set] = useState()
	useSnapshot(reference, ({ docs }) => set(docs.map(deserialize)), [reference])

	return documents
}

function deserialize(document) {
	return { id: document.id, ...document.data() }
}

export default typeof window === 'undefined'
	? () => [] // Don't use firestore during ssr
	: useCollection
