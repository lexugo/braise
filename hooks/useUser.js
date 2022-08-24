import { getApps } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { useEffect, useState } from 'react'

export default function useUser() {
	const [user, setUser] = useState(getUser)
	useEffect(() => onAuthStateChanged(getAuth(), setUser), [])

	return user
}

function getUser() {
	if (getApps().length)
		return getAuth().currentUser
}
