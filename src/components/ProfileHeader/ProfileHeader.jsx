import { Card } from "react-bootstrap"

const ProfileHeader = ({ firstName, lastName, valorations, profilImage }) => {

    return (

        <Card>

            <Card.Img variant="top" src={profilImage} />

            <Card.Body>

                <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
                <Card.Text>{valorations}</Card.Text>

            </Card.Body>

        </Card>

    )
}

export default ProfileHeader