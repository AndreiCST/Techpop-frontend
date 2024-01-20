import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import productService from '../../services/product.services'
import './HomePage.css'

const HomePage = () => {
	const [products, setProducts] = useState([])
	const [randomProd, setRandomProd] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function loadProducts() {
			setLoading(true)
			try {
				const { data } = await productService.getProducts()
				setProducts(data)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		loadProducts()
	}, [])

	useEffect(() => {
		let selectedProducts = []

		for (let i = 0; i <= 10; i++) {
			const random = Math.floor(Math.random() * products.length)
			selectedProducts.push(products[random])
		}

		setRandomProd(selectedProducts)
	}, [products])

	return (
		<main className='m-0 home-page d-flex justify-content-center '>
			<Row className='home-products pt-5 justify-content-center'>
				<Row className='pb-2 first-section'>
					<Col xs={12} md={6} className='position-relative'>
						<img className='home-image' src={`${randomProd[0]?.images[0]}`} alt='' />
					</Col>

					<Col xs={12} md={6} className='ps-4 pt-2'>
						<Row className='h-50'>
							<Col className='position-relative'>
								<img className='home-image' src={`${randomProd[1]?.images[0]}`} alt='' />
							</Col>

							<Col className='ms-2 position-relative'>
								<img className='home-image' src={`${randomProd[2]?.images[0]}`} alt='' />
							</Col>
						</Row>
						<Row className='pt-2 h-50'>
							<Col className='position-relative'>
								<img className='home-image' src={`${randomProd[3]?.images[0]}`} alt='' />
							</Col>

							<Col className='ms-2 position-relative'>
								<img className='home-image' src={`${randomProd[4]?.images[0]}`} alt='' />
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className='second-section'>
					<Col md={6} className='pe-4'>
						<Row className='h-50'>
							<Col className='position-relative '>
								<img className='home-image' src={`${randomProd[5]?.images[0]}`} alt='' />
							</Col>
							<Col className='ms-2 position-relative '>
								<img className='home-image' src={`${randomProd[6]?.images[0]}`} alt='' />
							</Col>
						</Row>
						<Row className=' pt-2 h-50'>
							<Col className='position-relative '>
								<img className='home-image' src={`${randomProd[7]?.images[0]}`} alt='' />
							</Col>
							<Col className='ms-2 position-relative '>
								<img className='home-image' src={`${randomProd[8]?.images[0]}`} alt='' />
							</Col>
						</Row>
					</Col>
					<Col md={6} className='position-relative '>
						<img className='home-image' src={`${randomProd[9]?.images[0]}`} alt='' />
					</Col>
				</Row>
			</Row>
		</main>
	)
}

export default HomePage
