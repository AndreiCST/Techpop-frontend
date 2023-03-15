import { useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from 'react-router-dom'
import uploadServices from "../../services/upload.services"
import FormError from "../FormError/FormError"


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        avatar: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/login'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, avatar: res.data[0] })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }



    return (

        <Form onSubmit={handleFormSubmit}>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="fistName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={signupData.firstName} onChange={handleInputChange} name="firstName" />
                </Form.Group>

                <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" value={signupData.lastName} onChange={handleInputChange} name="lastName" />
                </Form.Group>
            </Row>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando Avatar...' : 'Registrarme'}</Button>
            </div>

        </Form>
    )
}

export default SignupForm