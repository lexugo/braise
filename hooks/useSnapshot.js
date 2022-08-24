import { useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'

export default function useSnapshot(reference, callback, dependencies) {
	return useEffect(() => {
		if (reference) {
			log(reference) // TODO: logger service
			return onSnapshot(reference, callback)
		}
	}, dependencies)
}

function log(reference) { // TODO: prevent logging in production
	if (reference.type === 'collection')
		console.debug('Listening to collection:', reference.path)

	if (reference.type === 'document')
		console.debug('Listening to document:', reference.path)

	if (reference.type === 'query') {
		let message = 'Listening to query: '
		if (reference._query.limit)
			message += reference._query.limit + ' '
		message += reference._query.path.segments.join('/')

		if (reference._query.filters.length) {
			message += '\n\twhere '
			message += reference._query.filters.map(({ field, op, value }) =>
			`${field} ${op} ${value.stringValue}`).join('\n\tand ')
		}
		if (reference._query.explicitOrderBy.length) {
			message += '\n\torder by '
			message += reference._query.explicitOrderBy.map(({ field, dir }) =>
				`${field} ${dir}`).join('\n\tand ')
		}

		console.debug(message)
	}
}
