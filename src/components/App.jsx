import { Route, Routes } from 'react-router-dom'
import { useReducer, useEffect } from 'react'
import { MainContext } from './MainContext'
import Layout from './Layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Category from './pages/Category'
import Modal from './Modal' // <--- Импортируем модалку

// ErrorPage
import Basket from './pages/Basket'
import WishList from './pages/WishList'
import mainData from '../data/products.json'
import mainCategory from '../data/category.json'
function lazyFuncList(initial) {
	try {
		const savedState = localStorage.getItem('app_state')
		return savedState ? JSON.parse(savedState) : initial
	} catch (error) {
		console.error('Ошибка при чтении из localStorage:', error)
		return initial
	}
}
function ruleReducerList(state, action) {
	switch (action.type) {
		case 'ADD_PRODUCT': {
			const inBasket = state.basket.some(
				product => product.id === action.product.id,
			)

			if (!inBasket) {
				return {
					...state,
					basket: [...state.basket, { ...action.product, count: 1 }],
				}
			}

			return {
				...state,
				basket: state.basket.map(product =>
					product.id === action.product.id
						? { ...product, count: product.count + 1 }
						: product,
				),
			}
		}
		case 'DELETE_PRODUCT':
			return {
				...state,
				basket: state.basket.filter(product => {
					return product.id !== action.id
				}),
			}
		case 'RESET_BASKET':
			return { ...state, basket: [] }
		case 'CHECK_WISHLIST': {
			const isFavorite = state.wishList.find(
				product => product.id === action.product.id,
			)
			return {
				...state,
				wishList:
					isFavorite === undefined
						? [...state.wishList, action.product]
						: state.wishList.filter(
								product => product.id !== action.product.id,
							),
			}
		}

		default:
			return state
	}
}
function ruleReducerModal(state, action) {
	switch (action.type) {
		case 'OPEN_MODAL': {
			return { isOpen: true, modalDate: { ...action.product } }
		}
		case 'CLOSE_MODAL': {
			return { isOpen: false, modalDate: {} }
		}
		default:
			return state
	}
}
const initialStateModal = {
	isOpen: false,
	modalDate: {},
}
const initialStateList = {
	basket: [],
	wishList: [],
}
export default function App() {
	const [state, dispatch] = useReducer(
		ruleReducerList,
		initialStateList,
		lazyFuncList,
	)
	const [modalState, modalDispatch] = useReducer(
		ruleReducerModal,
		initialStateModal,
	)
	console.log(mainData)
	useEffect(() => {
		try {
			localStorage.setItem('app_state', JSON.stringify(state))
		} catch (error) {
			console.error('Ошибка при записи в localStorage:', error)
		}
	}, [state])
	return (
		<MainContext.Provider
			value={{
				state,
				dispatch,
				mainData,
				mainCategory,
				modalState,
				modalDispatch,
			}}
		>
			
			<Modal />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />

					<Route path='shop' element={<ShopPage />} />
					<Route path='/:category' element={<Category />} />

					<Route path='product:id' element={<ProductDetailsPage />} />
					<Route path='basket' element={<Basket />} />
					<Route path='wishlist' element={<WishList />} />
				</Route>
			</Routes>
		</MainContext.Provider>
	)
}
