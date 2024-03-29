import { Card, Col, Row } from 'react-bootstrap'
import ProductList from '../ListProduct/ListProduct'
import purchasesImg from './../../assets/imagenes/purchases-placeholder.png'
import './Purchases.css'

const Purchases = ({ purchases }) => {
	return (
		<>
			{purchases.length > 0 ? (
				<ProductList products={purchases} />
			) : (
				<Row className='pt-5'>
					<Col sm={{ span: 6, offset: 3 }} className='d-flex justify-content-center'>
						<Card className='PurchasesPlaceholder'>
							<Card.Img src={purchasesImg} />
							<Card.Text className='mt-5'>
								Aqui veras todos los productos comprados
							</Card.Text>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default Purchases
