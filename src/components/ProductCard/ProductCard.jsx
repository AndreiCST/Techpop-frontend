import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import './ProductCard.css'

const ProductCard = ({ _id, name, images, price }) => {

    return (

        <Link to={`/${_id}`} className='notDecoration'>
            <Card className='h-100 product'>
                <Card.Img variant="top" src={images[0]} className='prodImg' />
                <Card.Body>
                    <Card.Title className="mb-2 d-flex price">{price} €</Card.Title>
                    <Card.Text className='d-flex'>{name}</Card.Text>
                </Card.Body>
            </Card>
        </Link>

    )
}

export default ProductCard