import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FormError from '../FormError/FormError'
import { AuthContext } from '../../contexts/auth.context'
import authService from '../../services/auth.services'
import './FormLogin.css'

const LoginForm = () => {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})
	const [errors, setErrors] = useState([])

	const { authenticateUser } = useContext(AuthContext)

	const navigate = useNavigate()

	const handleInputChange = (e) => {
		const { value, name } = e.target
		setLoginData({ ...loginData, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		authService
			.login(loginData)
			.then(({ data }) => {
				localStorage.setItem('authToken', data.authToken)
				authenticateUser()
				navigate('/')
			})
			.catch((err) => setErrors(err.response.data.errorMessages))
	}

	return (
		<Form onSubmit={handleSubmit} className=''>
			<Form.Group className='mb-3' controlId='email'>
				<Form.Label>Email</Form.Label>
				<Form.Control
					type='email'
					value={loginData.email}
					onChange={handleInputChange}
					name='email'
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='password'>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					type='password'
					value={loginData.password}
					onChange={handleInputChange}
					name='password'
				/>
			</Form.Group>

			{errors.length > 0 && (
				<FormError>
					{errors.map((elm) => (
						<p>{elm}</p>
					))}
				</FormError>
			)}

			<div className='d-grid'>
				<Button variant='dark' type='submit'>
					Acceder
				</Button>
			</div>
		</Form>
	)
}

export default LoginForm
