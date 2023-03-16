import { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ProductCard.css'
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

        if (buyRequest.length > 0 && inSale === true) setHaveBuyer('h-100 product notification')

    }


    return (

        <Link to={`/${_id}`} className='notDecoration' >
            <Card className={haveBuyer}>
                <Card.Img variant="top" src={images ? images[0] : ''} className='prodImg p-2' />
                <Card.Body>
                    <Card.Title className="mb-2 d-flex price">{price} €</Card.Title>
                    <Card.Text className='d-flex'>{name}</Card.Text>
                </Card.Body>
            </Card>
        </Link >
    )
}

export default ProductCard