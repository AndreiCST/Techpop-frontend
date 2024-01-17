import { Card, Row } from 'react-bootstrap'
import StarValoration from '../StarValoration/StarValoration'
import './CardProfile.css'

const ProfileHeader = ({ user }) => {
	const { firstName, lastName, valorations, avatar } = user

	return (
		<Card className='profileCard '>
			<Row className='d-flex justify-content-center'>
				<div className='d-flex avatar-container'>
					<Card.Img src={avatar} className='profile-image' />
				</div>
			</Row>
			<Row>
				<Card.Body>
					<Card.Title>{`${firstName} ${lastName}`}</Card.Title>
					<StarValoration stars={valorations?.avgValoration} />
				</Card.Body>
			</Row>
		</Card>
	)
}

export default ProfileHeader
