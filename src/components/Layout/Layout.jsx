import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {
	return (
		<div className='wrapper'>
			<header className='header'>
				<Header />
			</header>
			<main className='main'>
				<Outlet />
			</main>
			<footer className='footer'>
				<Footer />
			</footer>
		</div>
	)
}
