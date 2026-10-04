import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MainContext } from '../MainContext'
export default function HomePage() {
	const { mainCategory } = useContext(MainContext)
	return (
		<div className='homepage'>
			<div className='homepage__content container'>
				<section className='homepage__categories-section categories-section'>
					<div className=' categories-section__titles'>
						<h1 className=' categories-section__title'>Popular Categories</h1>
						<Link to={'category'}>
							<span className=' categories-section__link link'>View All</span>
						</Link>
					</div>

					<ul className='categories-section__categories-list categories-list'>
						{mainCategory.map(({ id, name, icon }) => (
							<li
								key={id}
								className='categories-list__category-item category-item'
							>
								<Link to={`/${id}`}>
									<img src={icon} alt={id} className='category-item__img' />
									<h3 className='category-item__title'>{name} </h3>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	)
}
// {
// 	"id": "fresh-fruit",
// 	"name": "Fresh Fruit",
// 	"icon": "/images/categories/fruit.png"
// },
