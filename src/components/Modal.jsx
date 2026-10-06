import { useContext } from 'react'
import { MainContext } from './MainContext'

export default function Modal() {
	const { modalState, modalDispatch, dispatch, state , currency , walletChar} = useContext(MainContext)
	const totalCount = state.basket.reduce((acc, item) => acc + item.count, 0)
	const { isOpen, modalDate } = modalState
	const getRealPrice = () => {
		return currency === 'rub'
			? (modalDate.price * 84.82).toFixed(2)
			: modalDate.price
	}
	if (!isOpen || !modalDate || !modalDate.id) return null

	const discountedPrice =
		modalDate.discountPercent > 0
			? (getRealPrice() * (1 - modalDate.discountPercent / 100)).toFixed(2)
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
							<span className='modal__discount-price'>{walletChar}{discountedPrice}</span>
							<span className='modal__price modal__price--old'>
								{walletChar}{getRealPrice()}
							</span>
						</>
					) : (
						<span className='modal__price'>{walletChar}{getRealPrice()}</span>
					)}
				</div>

				<button
					type='button'
					className='modal__close-btn'
					onClick={() => modalDispatch({ type: 'CLOSE_MODAL' })}
				>
					✕
				</button>
				<div className='modal__basket-add'>
					<button
						type='button'
						className='basket-icon'
						onClick={() => {
							dispatch({ type: 'ADD_PRODUCT', product: modalDate })
						}}
						aria-label='Add to cart'
					>
						<img src='/svg/basket.svg' alt='Add to cart' />
						<span
							className={`basket-icon__count product-count ${totalCount < 1 ? 'visually-hidden' : ''}`}
						>
							{totalCount}
						</span>
					</button>
				</div>
			</div>
		</div>
	)
}
