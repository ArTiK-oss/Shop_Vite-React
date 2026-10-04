import { useContext, useState } from 'react'
import { MainContext } from '../MainContext'
import Rating from '../Rating'
import { Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import ProductCard from '../ProductCard'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Accordion from '../Accordion'
import { useToolBar } from '../../hooks/useToolBar'

const MIN = 0.1
const MAX = 100.0

export default function ShopPage() {
	const { mainData, mainCategory } = useContext(MainContext)
	const [sort, setSort] = useLocalStorage('sort', 'Newest')
	const [categoryToolbar, CategoryToggleSelected] = useToolBar(mainCategory)
	const [ratingsToolBar, ratingisToggleSecected] = useToolBar([
		{ rating: 5, id: 5 },
		{ rating: 4, id: 4 },
		{ rating: 3, id: 3 },
		{ rating: 2, id: 2 },
		{ rating: 1, id: 1 },
	])
	const [minPrice, setMinPrice] = useState(MIN)
	const [maxPrice, setMaxPrice] = useState(MAX)

	// Вся проверка для MIN выполняется при потере фокуса
	const handleMinBlur = () => {
		if (minPrice === '' || isNaN(Number(minPrice))) {
			setMinPrice(MIN)
			return
		}

		let val = Number(minPrice)

		// Проверяем рамки MIN и MAX
		if (val < MIN) val = MIN
		if (val > MAX) val = MAX

		// Не даем сделать minPrice больше current maxPrice
		const currentMax = maxPrice === '' ? MAX : Number(maxPrice)
		if (val > currentMax) val = currentMax

		setMinPrice(val)
	}

	// Вся проверка для MAX выполняется при потере фокуса
	const handleMaxBlur = () => {
		if (maxPrice === '' || isNaN(Number(maxPrice))) {
			setMaxPrice(MAX)
			return
		}

		let val = Number(maxPrice)

		// Проверяем рамки MIN и MAX
		if (val < MIN) val = MIN
		if (val > MAX) val = MAX

		// Не даем сделать maxPrice меньше current minPrice
		const currentMin = minPrice === '' ? MIN : Number(minPrice)
		if (val < currentMin) val = currentMin

		setMaxPrice(val)
	}

	// 1. Находим выбранные значения
	const selectedCategoryId = categoryToolbar.find(item => item.isSelected)?.id
	const selectedRating = ratingsToolBar.find(item => item.isSelected)?.rating

	// 2. Фильтруем данные
	const filteredProducts = (mainData || []).filter(
		({ categoryId, rating, price, discountPercent }) => {
			const finalPrice = price * (1 - (discountPercent || 0) / 100)

			// Безопасные значение для фильтрации во время набора
			const effectiveMin =
				minPrice !== '' && !isNaN(Number(minPrice)) ? Number(minPrice) : MIN
			const effectiveMax =
				maxPrice !== '' && !isNaN(Number(maxPrice)) ? Number(maxPrice) : MAX

			const checkPrice =
				finalPrice >= effectiveMin && finalPrice <= effectiveMax
			const checkCategory = selectedCategoryId
				? selectedCategoryId === categoryId
				: true
			const checkRating = selectedRating ? selectedRating === rating : true

			return checkCategory && checkRating && checkPrice
		},
	)

	return (
		<div className='shop-page container'>
			<div className='shop__toolbar'>
				<h1 className='shop__filter-btn'>Filter</h1>
				<select
					className='shop__sort'
					value={sort}
					onChange={e => setSort(e.target.value)}
				>
					<option value='Latest'>Latest</option>
					<option value='Newest'>Newest</option>
				</select>

				<div className='shop__results'>
					{filteredProducts.length} Results Found
				</div>
			</div>

			<div className='shop-page__content'>
				<aside className='shop-page__sidebar sidebar'>
					<Accordion title='All Category'>
						<ul className='sidebar__categories'>
							{categoryToolbar.map(item => (
								<li key={item.id} className='sidebar__category'>
									<label htmlFor={item.id}>{item.name}</label>
									<input
										type='checkbox'
										id={item.id}
										checked={item.isSelected}
										onChange={() => CategoryToggleSelected(item.id)}
									/>
								</li>
							))}
						</ul>
					</Accordion>

					<Accordion title='Rating'>
						<ul className='sidebar__ratings'>
							{ratingsToolBar.map(({ rating, id, isSelected }) => (
								<li key={id} className='sidebar__rating'>
									<label htmlFor={id}>{rating}</label>
									<input
										type='checkbox'
										id={id}
										checked={isSelected}
										onChange={() => ratingisToggleSecected(id)}
									/>
									<Rating rating={rating} />
								</li>
							))}
						</ul>
					</Accordion>

					<Accordion title='Price'>
						<div className='sidebar__price price'>
							<label className='price__field'>
								<span className='price__label'>Min Price</span>
								<input
									type='number'
									step='0.1'
									min={MIN}
									max={MAX}
									className='price__input'
									value={minPrice}
									onChange={e => setMinPrice(e.target.value)}
									onBlur={handleMinBlur}
								/>
							</label>

							<span className='price__separator'>—</span>

							<label className='price__field'>
								<span className='price__label'>Max Price</span>
								<input
									type='number'
									step='0.1'
									min={MIN}
									max={MAX}
									className='price__input'
									value={maxPrice}
									onChange={e => setMaxPrice(e.target.value)}
									onBlur={handleMaxBlur}
								/>
							</label>
						</div>
					</Accordion>
				</aside>

				<div className='shop-page__filtered-products filtered-products'>
					{filteredProducts.length > 0 ? (
						<ul className='filtered-products__content'>
							{filteredProducts.map(product => (
								<ProductCard product={product} key={product.id} />
							))}
						</ul>
					) : (
						<p className='no-products'>Товары не найдены</p>
					)}
				</div>
			</div>
		</div>
	)
}
