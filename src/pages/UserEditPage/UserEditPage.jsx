import { useState, useEffect, useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import UserEditForm from '../../components/FormUserEdit/FormUserEdit'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'
import CardProfile from '../../components/CardProfile/CardProfile'

import './UserEditPage.css'

const UserEditPage = () => {
	const { user_id } = useParams()
	const [user, setUser] = useState([])

	useEffect(() => {
		loadUser()
	}, [])

	const loadUser = () => {
		userService
			.getUser(user_id)
			.then(({ data }) => {
				setUser({
					_id: data._id,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					avatar: data.avatar,
					valorations: data.valorations,
				})
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className='user-edit-page p-5'>
			<Row>
				<Col sm={12} md={{ offset: 0, span: 2 }}>
					<CardProfile user={user} />
				</Col>
				<Col sm={12} md={{ offset: 2, span: 8 }}>
					<h1>Editar Perfil</h1>
					<div className='user-edit-form'>
						<UserEditForm user={user} setUser={setUser} />
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default UserEditPage
