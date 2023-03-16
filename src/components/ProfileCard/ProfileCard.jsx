import { Card } from "react-bootstrap"
import StarValoration from "../StarValoration/StarValoration"
import './ProfileCard.css'

const ProfileHeader = ({ firstName, lastName, averageValoration, profilImage }) => {

    return (

        <Card className="profileCard">

            <div className="d-flex justify-content-center mt-3">
                <Card.Img src={profilImage} className='rounded-circle profileImage' />
            </div>

            <Card.Body>

                <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
                <StarValoration stars={averageValoration} />

            </Card.Body>

        </Card>

    )
}

export default ProfileHeader