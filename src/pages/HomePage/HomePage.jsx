import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel'
import productService from '../../services/product.services'
import './HomePage.css'

const HomePage = () => {
	const [products, setProducts] = useState([])
	const [productsImg, setProductsImg] = useState([])

	useEffect(() => {
		loadProducts()
	}, [])

	const loadProducts = () => {
		productService
			.getProducts()
			.then(({ data }) => {
				setProducts(data)
				const imagesArray = data?.map((product) => product.images)
				setProductsImg(imagesArray)
			})
			.catch((err) => console.log(err))
	}

	return (
		<Row className='m-0 main'>
			<Col xs={12} className='carousel'>
				<Row className=''>
					<Col xs={12} className='p-0'>
						<HomeCarousel />
					</Col>
				</Row>
			</Col>
			<Col className=''>
				<div className=''>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident obcaecati
					asperiores repellendus dolorem culpa? Delectus magni tempore ipsa consequatur
					provident dolore, nesciunt labore aperiam ducimus vitae dolor fugiat quod
					tenetur?
				</div>
			</Col>
		</Row>
	)
}

export default HomePage
