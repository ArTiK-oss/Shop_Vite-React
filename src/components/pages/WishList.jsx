import { useContext } from 'react'
import { MainContext } from '../MainContext'
import { Link } from 'react-router-dom'
export default function WishList() {
	const { state, dispatch } = useContext(MainContext)
	console.log(state.wishList)
	return (
		<>
			{state.wishList.length < 1 && (
				<div className='basket'>
					<p>виш Лист пуст.</p>
					<Link to='/'>обратно на главную</Link>
				</div>
			)}
			{state.wishList.length > 0 && (
				<div className='basket'>
					<ul>
						{state.wishList.map(product => (
							<li key={product.id}>
								{product.name} ::: {product.id} ::: {product.count}
								<button
									onClick={() => {
										dispatch({ type: 'CHECK_WISHLIST', product: product })
									}}
								>
									Убрать из избраных
								</button>
							</li>
						))}
					</ul>
					<Link to='/'>обратно на главную</Link>
				</div>
			)}
		</>
	)
}
