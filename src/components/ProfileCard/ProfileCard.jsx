import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import StarValoration from "../StarValoration/StarValoration"
import './ProfileCard.css'

const ProfileHeader = ({ id, firstName, lastName, averageValoration, profilImage }) => {

    return (

        <Card className="profileCard">

            <div className="d-flex justify-content-center mt-3">
                <Card.Img src={profilImage} className='rounded-circle profileImage' />
            </div>

            <Card.Body>

                <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
                <Link to={`/valorations/${id}`}>
                    <StarValoration stars={averageValoration} />
                </Link>

            </Card.Body>

        </Card>

    )
}

export default ProfileHeader