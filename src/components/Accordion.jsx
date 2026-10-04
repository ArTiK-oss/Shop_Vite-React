import { useState } from 'react'

export default function Accordion({ title, children, defaultOpen = true }) {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	return (
		<div className='accordion'>
			<div
				className={`accordion__header ${isOpen ? 'is-open' : ''}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<h2 className='accordion__title'>{title}</h2>
				<span className='accordion__arrow'>▼</span>
			</div>
			<div className={`accordion__main ${isOpen ? 'is-open' : ''}`}>
				<div className='accordion__inner'>{children}</div>
			</div>
		</div>
	)
}
