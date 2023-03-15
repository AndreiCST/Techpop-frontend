import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const UserCard = ({ _id, avatar, firstName, lastName, valorations }) => {

    return (

        <Link to={`/profile/${_id}`} className='notDecoration'>
            <Card className='h-100 product'>
                <Card.Img variant="top" src={avatar} className='prodImg' />
                <Card.Body>
                    <Card.Title className="mb-2 d-flex price">{firstName}</Card.Title>
                    <Card.Text className='d-flex'>{lastName}</Card.Text>
                    <Card.Text className='d-flex'>{valorations.avgValoration}</Card.Text>
                </Card.Body>
            </Card>
        </Link>

    )
}

export default UserCard