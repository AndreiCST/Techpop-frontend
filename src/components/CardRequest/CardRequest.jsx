import { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import transactionService from '../../services/transactions.services'
import ProductCard from '../CardProduct/CardProduct'
import './CardRequest.css'

const RequestCard = ({ _id, buyer, seller, product }) => {
	const { user } = useContext(AuthContext)

	const navigate = useNavigate()

	const handleBtnSell = () => {
		transactionService
			.acceptTrans(_id, product._id, buyer._id, seller)
			.then(() => navigate(`/profile/${user._id}`))
			.catch((err) => console.log(err))
	}

	const handleBtnReject = () => {
		transactionService
			.rejectTrans(_id, product._id)
			.then(() => navigate(`/profile/${user._id}`))
			.catch((err) => console.log(err))
	}

	return (
		<Card className='borderNone'>
			<Row className='align-items-center mt-5'>
				<Col md={{ span: 4, offset: 1 }}>
					<ProductCard {...product} />
				</Col>

				<Col>
					<Card.Title className='mb-5'>
						{buyer?.firstName} {buyer?.lastName} quiere comprar tu producto
					</Card.Title>
					<Button onClick={handleBtnSell}>Aceptar</Button>
					<Button onClick={handleBtnReject} className='ms-5'>
						Rechazar
					</Button>
				</Col>
			</Row>
		</Card>
	)
}

export default RequestCard
