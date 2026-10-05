import { useState, useEffect } from 'react'

export function useFetch(url) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	useEffect(() => {
		if (!url) return
		let isMounted = true
		const fetchData = async () => {
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const result = await response.json()
				if (isMounted) {
					setData(result)
					setError(null)
				}
			} catch (error) {
				if (isMounted) {
					console.error('Error fetching data:', error)
					setError(error.message)
					setData(null)
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}
		fetchData()
		return () => {
			isMounted = false // Очистка при смене url или размонтировании
		}
	}, [url])

	return [data, loading, error]
}