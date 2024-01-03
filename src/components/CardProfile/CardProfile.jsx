import { Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StarValoration from '../StarValoration/StarValoration'
import './CardProfile.css'

const ProfileHeader = ({ id, firstName, lastName, averageValoration, profilImage }) => {
	return (
		<Card className='profileCard '>
			<Row className='d-flex justify-content-center'>
				<div className='d-flex avatar-container'>
					<Card.Img src={profilImage} className='profile-image' />
				</div>
			</Row>
			<Row>
				<Card.Body>
					<Card.Title>{`${firstName} ${lastName}`}</Card.Title>
					<StarValoration stars={averageValoration} />
				</Card.Body>
			</Row>
		</Card>
	)
}

export default ProfileHeader
