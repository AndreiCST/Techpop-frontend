import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import RequestCard from '../../components/CardRequest/CardRequest'
import productService from '../../services/product.services'
import transactionService from '../../services/transactions.services'

const ProductRequests = () => {
	const { product_id } = useParams()
	const [requests, setRequests] = useState([])

	useEffect(() => {
		requestsList()
	}, [])

	const requestsList = () => {
		productService
			.getOneProduct(product_id)
			.then(({ data }) => transactionService.getTransactions(data.buyRequest))
			.then(({ data }) => setRequests(data))
			.catch((err) => console.log(err))
	}

	return (
		<Row>
			{requests?.map((elem, index) => {
				return <RequestCard key={index} {...elem} />
			})}
		</Row>
	)
}

export default ProductRequests
