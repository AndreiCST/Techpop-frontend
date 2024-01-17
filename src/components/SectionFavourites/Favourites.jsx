import './Favourites.css'
import { Card, Col, Row } from 'react-bootstrap'
import ProductList from '../ListProduct/ListProduct'
import productImg from './../../assets/imagenes/favourite-products-placeholder.png'

const Favourites = ({ favourites }) => {
	const { products } = favourites
	const activeProducts = products.filter((elem) => elem.activeProduct === true)

	return (
		<>
			{activeProducts.length > 0 ? (
				<ProductList products={activeProducts} />
			) : (
				<Row className='pt-5'>
					<Col sm={{ span: 6, offset: 3 }} className='d-flex justify-content-center'>
						<Card className='favouritesPlaceholder'>
							<Card.Img src={productImg} />
							<Card.Text className='mt-5'>
								Guarda los productos que te interesan
							</Card.Text>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default Favourites
