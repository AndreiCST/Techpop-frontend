import { Button, Card, Col, Row } from "react-bootstrap"

const ProfileHeader = ({ profilInfo }) => {

    const { firstName, lastName, valorations, profilImage } = profilInfo

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={profilImage} />
            <Card.Body>
                <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
                <Card.Text>{valorations}</Card.Text>
            </Card.Body>
        </Card>

    )
}

export default ProfileHeader