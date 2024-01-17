import { AuthContext } from './../../contexts/auth.context'
import productService from '../../services/product.services'
import { Form, Col } from 'react-bootstrap'
import ProductsList from '../../components/ListProduct/ListProduct'
import { useState, useEffect, useContext } from 'react'
import Loader from './../../components/Loader/Loader'

import './ProductsListPage.css'

const ProductsListPage = () => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchString, setSearchString] = useState('')
	const [productsLength, setProductsLength] = useState(0)
	const [empySearch, setEmpySearch] = useState(true)

	const { user } = useContext(AuthContext)

	useEffect(() => {
		loadProducts()
	}, [])

	useEffect(() => {
		setEmpySearch(products.length !== productsLength)
	}, [products])

	const loadProducts = () => {
		productService
			.getProducts()
			.then(({ data }) => {
				setProductsLength(data.length)
				setProducts(data)
				setIsLoading(false)
			})
			.catch((err) => console.log(err))
	}

	const handleSearch = (e) => {
		e.preventDefault()

		if (!searchString) {
			setSearchString('')
			return
		} else {
			setSearchString(e.target.value)
			productService
				.getSearchString(searchString)
				.then(({ data }) => setProducts(data))
				.catch((err) => console.log(err))
		}
	}

	return (
		<div className='search-page'>
			<Form className='pt-3 search-bar' onSubmit={handleSearch}>
				<Col xs={{ offset: 2, span: 8 }} sm={{ offset: 3, span: 6 }}>
					<Form.Control
						type='search'
						placeholder='Search'
						aria-label='Search'
						value={searchString ? searchString : ''}
						onChange={(e) => setSearchString(e.target.value)}
					/>
				</Col>
			</Form>

			{isLoading ? (
				<Loader />
			) : (
				<div className='search-products px-5'>
					<ProductsList products={products} />
				</div>
			)}
		</div>
	)
}

export default ProductsListPage
