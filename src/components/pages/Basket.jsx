import { useContext } from 'react'
import { MainContext } from '../MainContext'
import { useNavigate } from 'react-router-dom'

export default function Basket() {
	const navigate = useNavigate()
	const { state, dispatch, currency, walletChar } = useContext(MainContext)

	// Расчет общей стоимости в базовой валюте
	const total = state.basket.reduce(
		(acc, { price, count, discountPercent }) => {
			return acc + count * (price * (1 - discountPercent / 100))
		},
		0,
	)

	return (
		<div className='cart-page cart-page--basket'>
			<div className='cart-page__content container'>
				<h1 className='cart-page__title'>My Shopping Cart</h1>

				<div className='cart-page__main'>
					<ul className='cart-page__list'>
						<li className='cart-page__header'>
							<span>PRODUCT</span>
							<span>PRICE</span>
							<span>QUANTITY</span>
							<span>SUBTOTAL</span>
						</li>

						{state.basket.length === 0 ? (
							<li className='cart-page__empty'>
								<p>Корзина пуста...</p>
							</li>
						) : (
							state.basket.map(
								({ id, name, price, count, discountPercent, image }) => {
									const discountPrice = price * (1 - discountPercent / 100)
									const realPriceNum =
										currency === 'rub' ? discountPrice * 84.82 : discountPrice

									return (
										<li key={id} className='cart-page__item'>
											<img src={image} alt={name} className='cart-page__img' />
											<span className='cart-page__name'>{name}</span>

											<span className='cart-page__price'>
												{realPriceNum.toFixed(2)} {walletChar}
											</span>

											<div className='cart-page__counter counter'>
												<button
													type='button'
													className='counter__btn counter__btn--decrement'
													onClick={() =>
														dispatch({ type: 'DECREMENT_PRODUCT', id })
													}
												>
													-
												</button>
												<span className='counter__value'>{count}</span>
												<button
													type='button'
													className='counter__btn counter__btn--increment'
													onClick={() =>
														dispatch({ type: 'INCREMENT_PRODUCT', id })
													}
												>
													+
												</button>
											</div>

											<span className='cart-page__subtotal'>
												{(realPriceNum * count).toFixed(2)} {walletChar}
											</span>

											<button
												type='button'
												className='cart-page__remove'
												onClick={() => dispatch({ type: 'DELETE_PRODUCT', id })}
											>
												×
											</button>
										</li>
									)
								},
							)
						)}

						<li className='cart-page__actions'>
							<button onClick={() => navigate(-1)} className='link'>
								Назад
							</button>
							<button
								onClick={() => navigate('/shop', { replace: true })}
								className='link'
							>
								Магазин
							</button>
							<button
								onClick={() => navigate('/', { replace: true })}
								className='link'
							>
								Главная страница
							</button>
						</li>
					</ul>

					{state.basket.length > 0 && (
						<div className='cart-page__total'>
							<span>Total:</span>
							<span>
								{(currency === 'rub' ? total * 84.82 : total).toFixed(2)}{' '}
								{walletChar}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
