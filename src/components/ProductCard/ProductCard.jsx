import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import './ProductCard.css'

const ProductCard = ({ _id, name, images, price }) => {

    return (
        <>
            <Link to={`/${_id}`}>
                <Card className={'ProductCard mb-3'}>
                    <Card.Img variant="top" src={images[0]} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                        <Button variant="dark">Not Aplied</Button>
                    </Card.Body>
                </Card>
            </Link>
        </>

    )
}

export default ProductCard