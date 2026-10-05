import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useEffect, useContext } from 'react'
import { MainContext } from '../MainContext'

export default function Header() {
	const {
		state,
		userWallet,
		lang,
		setLang,
		currency,
		setCurrency,
		isUserSet,
		setIsUserSet,
		walletChar,
	} = useContext(MainContext)
	const [data, loading, error] = useFetch(
		'https://ipinfo.io/json?token=02f7b1168f4167',
	)
	const totalCount = state.basket.reduce((acc, item) => acc + item.count, 0)
	useEffect(() => {
		document.documentElement.lang = lang
	}, [lang])
	useEffect(() => {
		if (!data || isUserSet) return

		const country = data.country?.toLowerCase()

		if (country === 'ru') {
			setLang('ru')
			setCurrency('rub')
		} else {
			setLang('en')
			setCurrency('usd')
		}
	}, [data, isUserSet])

	return (
		<>
			<div className='header__top header-top'>
				<div className='header-top__content container'>
					<div className='header-top__geolocation geolocation'>
						<img
							src='/svg/geo.svg'
							alt='Shopery Logo'
							className='geolocation__logo'
						/>
						{loading && <span className='geolocation__title'>Loading...</span>}
						{error && <span className='geolocation__title'>{error}</span>}
						{data && (
							<span className='geolocation__title'>
								{data.city}/{data.region}/{data.country}: Time zone-
								{data.timezone}
							</span>
						)}
					</div>
					<div className='header-top__utils utils'>
						<div className='utils__selections selections'>
							<select
								name='lang'
								id='lang-select'
								className='selections__select lang-select'
								value={lang}
								onChange={e => {
									setLang(e.target.value)
									setIsUserSet(true)
								}}
							>
								<option value='ru'>RU</option>
								<option value='en'>ENG</option>
							</select>

							<select
								name='currency'
								value={currency}
								onChange={e => {
									setCurrency(e.target.value)
									setIsUserSet(true)
								}}
								id='currency-select'
								className='selections__select currency-select'
							>
								<option value='usd'>USD</option>
								<option value='rub'>RUB</option>
							</select>
						</div>

						<div className='utils__auth auth'>
							<Link to='/signin' className='auth__link'>
								Sign In
							</Link>
							<span className='auth__separator'> / </span>
							<Link to='/signup' className='auth__link'>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='header__middle header-middle'>
				<div className='header-middle__content container'>
					<Link to='/' className='header-middle__logo'>
						<img src='/svg/logo.svg' alt='LOGO' />
						<h1>Ecobazar</h1>
					</Link>

					<div className='header-middle__search'>
						<input type='text' placeholder='Search' />
						<button className='button'>Search</button>
					</div>

					<div className='header-middle__util'>
						<Link to='wishlist' className='header-middle__favorite'>
							<img src='/svg/favorite.svg' alt='favorites' />
						</Link>

						{/* Выносим корзину в отдельный чистый БЭМ-блок basket */}
						<div className='header-middle__basket basket'>
							<Link to='basket' className='basket__link'>
								<img src='/svg/basket.svg' alt='basket' />
								<span
									className={`basket__count product-count ${totalCount < 1 ? 'visually-hidden' : ''}`}
								>
									{totalCount}
								</span>
							</Link>
							<div className='basket__info'>
								<p>
									Shopping Cart
									<span className='basket__price'>
										{userWallet}
										{walletChar}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='header__bottom header-bottom'>
				<div className='header-bottom__content container'>
					<nav className='header-bottom__navigation'>
						<Link to='/'>home</Link>
						<Link to='shop'>shop</Link>
					</nav>
					<Link className='header-bottom__phone' to={'phone'}>
						<img
							src='/svg/phone.svg'
							alt='phone'
							className='header-bottom__phone-icon'
						/>
						<span className='header-bottom__phone-text'> (219) 555-0114</span>
					</Link>
				</div>
			</div>
		</>
	)
}
