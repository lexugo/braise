import { useMemo, useState } from 'react'
import useSnapshot from './useSnapshot'

import { collection, getFirestore, query } from 'firebase/firestore'

export default function useCollection(path, constraints, deps = []) {
	const firestore = getFirestore()
	const reference = useMemo(() => constraints
		? query(collection(firestore, path), ...constraints)
		: collection(firestore, path)
		, [path, ...deps])

	const [documents, set] = useState()
	useSnapshot(reference, ({ docs }) => set(docs.map(deserialize)), [reference])

	return documents
}

function deserialize(document) {
	return { id: document.id, ...document.data() }
}
