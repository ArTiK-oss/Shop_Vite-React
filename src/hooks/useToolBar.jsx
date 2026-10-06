import { useState } from 'react'

export function useToolBar(data = []) {
	// Безопасно обрабатываем передаваемый массив и инициализируем isSelected
	const [value, setValue] = useState(() =>
		(data || []).map(item => ({ ...item, isSelected: false })),
	)

	const toggleSelected = id => {
		setValue(prevData =>
			prevData.map(item => ({
				...item,
				isSelected: item.id === id ? !item.isSelected : false,
			})),
		)
	}

	return [value, toggleSelected  ]
}
