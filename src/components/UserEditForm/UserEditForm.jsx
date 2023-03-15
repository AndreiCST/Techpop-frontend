import { useState, useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'
import uploadServices from '../../services/upload.services'
import FormError from '../FormError/FormError.jsx'
import './ProductEditForm.css'

import './UserEditForm.css'


const UserEditForm = () => {

    const { user } = useContext(AuthContext)
    const { refreshToken } = useContext(AuthContext)

    const [userData, setUserData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // password: user.password,
        // avatar: user.avatar
    })

    // const [loadingImage, setLoadingImage] = useState(false)
    // const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    function handleInputChange(e) {
        const { value, name } = e.target
        setProductData({ ...userData, [name]: value })
    }

    // const handleImageChange = e => {
    //     const { name, value, files } = e.target
    //     const newImages = [...productData.images]

    //     const file = files[0]
    //     const reader = new FileReader()

    //     reader.onloadend = () => {
    //         newImages[value] = reader.result
    //         setProductData({ ...productData, images: newImages })

    //         const formData = new FormData()
    //         formData.append('imageData', file)

    //         uploadServices.uploadimage(formData)
    //             .then(res => {
    //                 console.log('Image uploaded successfully!')
    //             })
    //             .catch(err => {
    //                 console.error(err)
    //             })
    //     }

    //     reader.readAsDataURL(file)
    // }

    const handleFormSubmit = e => {

        e.preventDefault()

        userService
            .getUserAndUpdate(user._id, userData)
            .then(() => {
                refreshToken()
                navigate(`/profile/${user._id}`)
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (

        <>
            <h1>Edit Profile</h1>
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

                {/* <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" value={user.avatar} onChange={handleFileUpload} />
                </Form.Group> */}

                {/* <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={user.password} onChange={handleInputChange} name="password" />
                </Form.Group> */}

                {/* {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>} */}

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando Avatar...' : 'Editar perfil'}</Button>
                </div>

            </Form>
        </>
    )
}

export default UserEditForm