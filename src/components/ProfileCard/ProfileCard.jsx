import { Card } from "react-bootstrap"
import './ProfileCard.css'

const ProfileHeader = ({ firstName, lastName, averageValoration, profilImage }) => {

    return (

        <Card className="profileCard">

            <div className="d-flex justify-content-center mt-3">
                <Card.Img src={profilImage} className='rounded-circle profileImage' />
            </div>

            <Card.Body>

                <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
                <Card.Text>{averageValoration}</Card.Text>

            </Card.Body>

        </Card>

    )
}

export default ProfileHeader