import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'
import authService from '../../services/auth.services'
import uploadServices from '../../services/upload.services'
import FormError from '../FormError/FormError.jsx'

import './UserEditForm.css'


const UserEditForm = ({ user, setUser }) => {

    const { refreshToken } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    function handleInputChange(e) {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setUser({ ...user, avatar: res.data[0] })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        userService
            .getUserAndUpdate(user._id, { firstName: user.firstName, lastName: user.lastName, email: user.email, avatar: user.avatar })
            .then(() => {
                refreshToken()
                navigate(`/profile/${user._id}`)
                console.log(user.avatar)
            })
            // .catch(err => console.log(err))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (

        <>
            <h1>Editar Perfil</h1>
            <hr />

            <Form onSubmit={handleFormSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="fistName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={user.firstName} onChange={handleInputChange} name="firstName" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" value={user.lastName} onChange={handleInputChange} name="lastName" />
                    </Form.Group>
                </Row>


                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={user.email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando Avatar...' : 'Editar perfil'}</Button>
                </div>

            </Form>
        </>
    )
}

export default UserEditForm