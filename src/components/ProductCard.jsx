import { useContext } from 'react'
import { MainContext } from './MainContext'
import Rating from './Rating'

export default function ProductCard({ product }) {
	const { state, dispatch, modalDispatch } = useContext(MainContext)

	const isFavorite = state.wishList.some(item => item.id === product.id)

	const discountedPrice =
		product.discountPercent > 0
			? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
			: null

	const handleOpenModal = () => {
		modalDispatch({ type: 'OPEN_MODAL', product })
	}

	const handleToggleWishlist = e => {
		e.stopPropagation()
		dispatch({ type: 'CHECK_WISHLIST', product })
	}

	const handleAddToCart = e => {
		e.stopPropagation() 
		dispatch({ type: 'ADD_PRODUCT', product })
	}

	return (
		<li
			className='product-item'
			onClick={handleOpenModal} 
		>
			{product.discountPercent > 0 && (
				<span className='product-item__badge'>
					Sale {product.discountPercent}%
				</span>
			)}
			<button
				type='button'
				className={`product-item__favorite-btn ${isFavorite ? 'product-item__favorite-btn--active' : ''}`}
				onClick={handleToggleWishlist}
				aria-label='Add to wishlist'
			>
				<svg
					width='20'
					height='18'
					viewBox='0 0 20 18'
					fill={isFavorite ? '#FF0000' : 'none'}
					stroke={isFavorite ? '#FF0000' : '#1A1A1A'}
					strokeWidth='1.5'
				>
					<path d='M17.051 1.5C14.9701 1.5 13.1567 2.68688 12.213 4.428C11.2693 2.68688 9.45587 1.5 7.375 1.5 C4.26812 1.5 1.75 4.01812 1.75 7.125 C1.75 12.0625 12.213 16.875 12.213 16.875 C12.213 16.875 22.676 12.0625 22.676 7.125 C22.676 4.01812 20.1579 1.5 17.051 1.5Z' />
				</svg>
			</button>

			<div className='product-item__img'>
				<img
					src={product.image}
					alt={`${product.name} - ${product.category}`}
				/>
			</div>

			<div className='product-item__content'>
				<div className='product-item__info'>
					<h3 className='product-item__name'>{product.name}</h3>

					<div className='product-item__prices'>
						{discountedPrice ? (
							<>
								<span className='product-item__price'>${discountedPrice}</span>
								<span className='product-item__real-price product-item__real-price--old'>
									${product.price}
								</span>
							</>
						) : (
							<span className='product-item__real-price'>${product.price}</span>
						)}
					</div>

					<div className='product-item__rating'>
						<Rating rating={product.rating} />
					</div>
				</div>

				<button
					type='button'
					className='product-item__basket-add'
					onClick={handleAddToCart}
					aria-label='Add to cart'
				>
					<img src='/svg/basket.svg' alt='Add to cart' />
				</button>
			</div>
		</li>
	)
}
