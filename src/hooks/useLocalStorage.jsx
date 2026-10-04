import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		try {
			const localData = localStorage.getItem(key)
			if (localData === null) return initialValue

			try {
				// Пробуем распарсить как JSON (объекты, массивы, числа, boolean)
				return JSON.parse(localData)
			} catch {
				// Если это простая строка, возвращаем как есть
				return localData
			}
		} catch (err) {
			console.error(`Ошибка при чтении localStorage ключа "${key}":`, err)
			return initialValue
		}
	})

	useEffect(() => {
		try {
			// Сохраняем значения (объекты и массивы автоматически превращаются в JSON-строку)
			localStorage.setItem(
				key,
				typeof value === 'string' ? value : JSON.stringify(value),
			)
		} catch (err) {
			console.error(`Ошибка при записи в localStorage ключа "${key}":`, err)
		}
	}, [key, value])

	return [value, setValue]
}
