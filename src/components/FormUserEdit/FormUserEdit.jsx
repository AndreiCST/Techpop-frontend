import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context.jsx'
import userService from '../../services/user.services.js'
import uploadServices from '../../services/upload.services.js'
import FormError from '../FormError/FormError.jsx'

const UserEditForm = ({ user, setUser }) => {
	const { refreshToken } = useContext(AuthContext)
	const [loadingImage, setLoadingImage] = useState(false)
	const [errors, setErrors] = useState([])
	const { logout } = useContext(AuthContext)

	const navigate = useNavigate()

	function handleInputChange(e) {
		const { value, name } = e.target
		setUser({ ...user, [name]: value })
	}

	const handleFileUpload = (e) => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append('imageData', e.target.files[0])

		uploadServices
			.uploadimage(formData)
			.then((res) => {
				setUser({ ...user, avatar: res.data[0] })
				setLoadingImage(false)
			})
			.catch((err) => console.log(err))
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()

		userService
			.getUserAndUpdate(user._id, {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				avatar: user.avatar,
			})
			.then(() => {
				refreshToken()
				navigate(`/profile/${user._id}`)
				console.log(user.avatar)
			})
			.catch((err) => setErrors(err.response.data.errorMessages))
	}

	const handleDeleteButton = () => {
		logout()

		userService
			.deleteUser(user._id)
			.then(() => console.log('el usuario se ha borrado'))
			.catch((err) => console.log(err))
	}

	return (
		<>
			<Form onSubmit={handleFormSubmit}>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={12} md={6} controlId='fistName'>
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type='text'
							value={user.firstName || ''}
							onChange={handleInputChange}
							name='firstName'
						/>
					</Form.Group>

					<Form.Group as={Col} sm={12} md={6} controlId='lastName'>
						<Form.Label>Apellido</Form.Label>
						<Form.Control
							type='text'
							value={user.lastName || ''}
							onChange={handleInputChange}
							name='lastName'
						/>
					</Form.Group>
				</Row>

				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						value={user.email || ''}
						onChange={handleInputChange}
						name='email'
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='image'>
					<Form.Label>Imagen (URL)</Form.Label>
					<Form.Control type='file' onChange={handleFileUpload} />
				</Form.Group>

				{errors?.length > 0 && (
					<FormError>
						{errors.map((elm) => (
							<p>{elm}</p>
						))}
					</FormError>
				)}

				<Row>
					<Col>
						<Button variant='dark' type='submit' disabled={loadingImage}>
							{loadingImage ? 'Cargando Avatar...' : 'Editar perfil'}
						</Button>
					</Col>
					<Col>
						<Button onClick={handleDeleteButton} variant='warning'>
							Eliminar perfil
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	)
}

export default UserEditForm
