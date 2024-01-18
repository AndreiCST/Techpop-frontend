import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productService from '../../services/product.services'
import transactionService from '../../services/transactions.services'
import CardProfile from '../../components/CardProfile/CardProfile.jsx'
import CardProduct from '../../components/CardProduct/CardProduct.jsx'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context.jsx'
import './ProductRequests.css'

const ProductRequests = () => {
	const { product_id } = useParams()
	const [requests, setRequests] = useState([])
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	function requestsList() {
		productService
			.getOneProduct(product_id)
			.then(({ data }) => transactionService.getTransactions(data.buyRequest))
			.then(({ data }) => setRequests(data))
			.catch((err) => console.log(err))
	}

	const handleBtnSell = ({ _id, product, buyer, seller }) => {
		transactionService
			.acceptTrans(_id, product._id, buyer._id, seller)
			.then(() => {})
			.catch((err) => console.log(err))
		navigate('/')
	}

	const handleBtnReject = ({ _id, product }) => {
		transactionService
			.rejectTrans(_id, product._id)
			.then(() => {})
			.catch((err) => console.log(err))
		navigate('/')
	}

	useEffect(() => {
		requestsList()
	}, [])

	return (
		<div className='requests-page py-5'>
			{requests?.map((request) => {
				const { _id, buyer, product } = request
				return (
					<Card key={_id} className='border-none'>
						<Row className='align-items-center my-2 mx-0'>
							<Col md={{ span: 2, offset: 2 }}>
								<CardProduct {...product} />
							</Col>

							<Col md={{ span: 2, offset: 1 }}>
								<CardProfile user={buyer} />
							</Col>

							<Col md={2}>
								<Card.Title className='mb-5'>
									{buyer?.firstName} {buyer?.lastName} quiere comprar tu producto
								</Card.Title>
								<Button onClick={() => handleBtnSell(request)}>Aceptar</Button>
								<Button onClick={() => handleBtnReject(request)} className='ms-5'>
									Rechazar
								</Button>
							</Col>
						</Row>
					</Card>
				)
			})}
		</div>
	)
}

export default ProductRequests
