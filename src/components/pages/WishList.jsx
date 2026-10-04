import { useContext } from 'react'
import { MainContext } from '../MainContext'
import { Link } from 'react-router-dom'
export default function WishList() {
	const { state} = useContext(MainContext)
	console.log(state.wishList)
	return (
		<>
			{state.wishList.length < 1 && (
				<div className='basket'>
					<p>баскет пуст.</p>
					<Link to='/'>обратно на главную</Link>
				</div>
			)}
			{state.wishList.length > 0 && (
				<div className='basket'>
					<ul>
						{state.wishList.map(product => (
							<li key={product.id}>
								{product.name} ::: {product.id} ::: {product.count}
							</li>
						))}
					</ul>
					<Link to='/'>обратно на главную</Link>
				</div>
			)}
		</>
	)
}
