import { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CardProduct.css'
import { AuthContext } from '../../contexts/auth.context'

const ProductCard = ({ _id, name, images, price, buyRequest, owner, inSale }) => {
	const [haveBuyer, setHaveBuyer] = useState('h-100 product')
	const { user } = useContext(AuthContext)

	useEffect(() => {
		if (user) {
			user._id === owner && haveNotification()
		}
	}, [])

	const haveNotification = () => {
		if (buyRequest.length > 0 && inSale === true)
			setHaveBuyer('h-100 product notification')
	}

	return (
		<Link to={`/product/${_id}`} className='not-decoration'>
			<Card className={haveBuyer}>
				<div className='prod-img'>
					<Card.Img variant='top' src={images[0]} className='p-2' />
				</div>
				<Card.Body>
					<Card.Title className='mb-2 d-flex price '>{price} €</Card.Title>
					<Card.Text className='d-flex prod-text'>{name}</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default ProductCard
