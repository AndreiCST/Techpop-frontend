import { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import UserEditForm from '../../components/FormUserEdit/FormUserEdit'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'

import './UserEditPage.css'

const UserEditPage = () => {
	// const { user } = useContext(AuthContext)
	const { user_id } = useParams()
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		avatar: '',
	})

	useEffect(() => {
		loadUser()
	}, [])

	const loadUser = () => {
		userService
			.getUser(user_id)
			.then(({ data }) => {
				setUser(data)
			})
			.catch((err) => console.log(err))
	}

	return (
		<Container>
			<UserEditForm user={user} setUser={setUser} />
		</Container>
	)
}

export default UserEditPage
