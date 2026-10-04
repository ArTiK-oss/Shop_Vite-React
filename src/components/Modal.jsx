import { useContext } from 'react'
import { MainContext } from './MainContext'

export default function Modal() {
	const { modalState, modalDispatch } = useContext(MainContext)
	const { isOpen, modalDate } = modalState

	if (!isOpen || !modalDate || !modalDate.id) return null

	const discountedPrice =
		modalDate.discountPercent > 0
			? (modalDate.price * (1 - modalDate.discountPercent / 100)).toFixed(2)
			: null

	return (
		<div
			className='modal'
			onClick={() => modalDispatch({ type: 'CLOSE_MODAL' })}
		>
			<div className='modal__content' onClick={e => e.stopPropagation()}>
				<h1 className='modal__title'>{modalDate.name}</h1>
				<img
					src={modalDate.image}
					alt={modalDate.name}
					className='modal__img'
				/>

				<div className='modal__prices'>
					{discountedPrice ? (
						<>
							<span className='modal__discount-price'>${discountedPrice}</span>
							<span className='modal__price modal__price--old'>
								${modalDate.price}
							</span>
						</>
					) : (
						<span className='modal__price'>${modalDate.price}</span>
					)}
				</div>

				<button
					type='button'
					className='modal__close-btn'
					onClick={() => modalDispatch({ type: 'CLOSE_MODAL' })}
				>
					✕
				</button>
			</div>
		</div>
	)
}
