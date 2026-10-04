import { MainContext } from '../MainContext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../ProductCard'
export default function Category() {
	const { mainData, mainCategory } = useContext(MainContext)
	const { category } = useParams()
	const findCategory = mainCategory.find(item => item.id === category)
	return (
		<>
			{!findCategory && <span>страница не найдена</span>}
			{findCategory && (
				<div className='category'>
					<h2 className='category__title'>Category {category}</h2>
					<ul className='category__list'>
						{mainData
							.filter(product => product.categoryId === category)
							.map(product => (
								<ProductCard product={product} key={product.id}/>
							))}
					</ul>
				</div>
			)}
		</>
	)
}

// {
// 	"id": 1,
// 	"name": "Green Apple",
// 	"category": "Fresh Fruit",
// 	"categoryId": "fresh-fruit",
// 	"price": 20.99,
// 	"discountPercent": 50,
// 	"rating": 4,
// 	"image": "/images/products/green-apple.png",
// 	"isPopular": true
// },
