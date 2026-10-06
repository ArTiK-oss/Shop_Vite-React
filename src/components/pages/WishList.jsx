import { useContext } from 'react'
import { MainContext } from '../MainContext'
import { useNavigate } from 'react-router-dom'

export default function WishList() {
	const navigate = useNavigate()
	const { state, dispatch, currency, walletChar } = useContext(MainContext)

	return (
		<div className='cart-page cart-page--wishlist'>
			<div className='cart-page__content container'>
				<h1 className='cart-page__title'>My Wishlist</h1>

				<div className='cart-page__main'>
					<ul className='cart-page__list'>
						<li className='cart-page__header'>
							<span>PRODUCT</span>
							<span>PRICE</span>
							<span>ACTION</span>
						</li>

						{state.wishList.length === 0 ? (
							<li className='cart-page__empty'>
								<p>В избранном пока ничего нет...</p>
							</li>
						) : (
							state.wishList.map(item => {
								const { id, name, price, discountPercent, image } = item
								const discountPrice = price * (1 - discountPercent / 100)

								const realPriceNum =
									currency === 'rub' ? discountPrice * 84.82 : discountPrice
								const oldPriceNum = currency === 'rub' ? price * 84.82 : price

								return (
									<li key={id} className='cart-page__item'>
										<img src={image} alt={name} className='cart-page__img' />
										<span className='cart-page__name'>{name}</span>

										<div className='cart-page__price-block'>
											<span className='cart-page__price'>
												{realPriceNum.toFixed(2)} {walletChar}
											</span>
											{discountPercent > 0 && (
												<span className='cart-page__price-discounted'>
													{oldPriceNum.toFixed(2)} {walletChar}
												</span>
											)}
										</div>

										<div className='cart-page__actions-cell'>
											<button
												type='button'
												className='cart-page__add-to-cart-btn'
												onClick={() =>
													dispatch({ type: 'ADD_PRODUCT', product: item })
												}
											>
												<img src='./svg/basket.svg' alt='add-to-card' />
											</button>
											<button
												type='button'
												className='cart-page__remove'
												onClick={() =>
													dispatch({ type: 'CHECK_WISHLIST', product: item })
												}
											>
												×
											</button>
										</div>
									</li>
								)
							})
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
								onClick={() => navigate('/basket', { replace: true })}
								className='link'
							>
								Корзина
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
