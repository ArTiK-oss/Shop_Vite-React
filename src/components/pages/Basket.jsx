import { useContext } from 'react'
import { MainContext } from '../MainContext'
import { Link } from 'react-router-dom'
export default function Basket() {
	const { state, dispatch } = useContext(MainContext)
	console.log(state.basket)
	return (
		<>
			{state.basket.length < 1 && (
				<div className='basket'>
					<p>баскет пуст.</p>
					<Link to='/'>обратно на главную</Link>
				</div>
			)}
			{state.basket.length > 0 && (
				<div className='basket'>
					<ul>
						{state.basket.map(product => (
							<li key={product.id}>
								{product.name} ::: {product.id} ::: {product.count}
								<button
									onClick={() => {
										dispatch({ type: 'DELETE_PRODUCT', id: product.id })
									}}
								>
									удалить
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
