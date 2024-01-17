import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import FormError from '../FormError/FormError'

const SignupForm = () => {
	const [signupData, setSignupData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState([])

	const navigate = useNavigate()

	const handleInputChange = (e) => {
		const { value, name } = e.target
		setSignupData({ ...signupData, [name]: value })
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()

		authService
			.signup(signupData)
			.then(() => navigate('/login'))
			.catch((err) => setErrors(err.response.data.errorMessages))
	}

	return (
		<Form
			onSubmit={handleFormSubmit}
			className='d-flex flex-column justify-content-center'
		>
			<Row className='pb-5'>
				<Form.Group as={Col} controlId='fistName'>
					<Form.Label>Nombre</Form.Label>
					<Form.Control
						type='text'
						value={signupData.firstName}
						onChange={handleInputChange}
						name='firstName'
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='lastName'>
					<Form.Label>Apellido</Form.Label>
					<Form.Control
						type='text'
						value={signupData.lastName}
						onChange={handleInputChange}
						name='lastName'
					/>
				</Form.Group>
			</Row>

			<Form.Group className='mb-3' controlId='email pb-5'>
				<Form.Label>Email</Form.Label>
				<Form.Control
					type='email'
					value={signupData.email}
					onChange={handleInputChange}
					name='email'
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='password pb-5'>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					type='password'
					value={signupData.password}
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

			<div className='pt-5'>
				<Button variant='secondary' type='submit'>
					sign in
				</Button>
			</div>
		</Form>
	)
}

export default SignupForm
