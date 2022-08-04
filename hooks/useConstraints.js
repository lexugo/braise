import { where, orderBy, limit } from 'firebase/firestore'

import { useMemo } from 'react'

export function useWhere(path, op, value) {
	return useMemo(() => value && where(path, op, value), [path, op, value]) // An undefined value would be invalid
}

export function useOrderBy(path, dir) {
	return useMemo(() => orderBy(path, dir), [path, dir])
}

export function useLimit(value) {
	return useMemo(() => value && limit(value), [value]) // An undefined value would be invalid
}
