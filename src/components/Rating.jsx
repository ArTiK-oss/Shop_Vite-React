export default function Rating({ rating = 0 }) {
	const stars = Array.from({ length: 5 })

	return (
		<ul className='rating'>
			{stars.map((_, index) => (
				<li key={index} className='rating__item'>
					<img
						src={index < rating ? '/svg/active-star.svg' : '/svg/de-active.svg'}
						alt={index < rating ? 'Active star' : 'Inactive star'}
						className='rating__star'
					/>
				</li>
			))}
		</ul>
	)
}
