import { useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from 'react-router-dom'


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

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

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default SignupForm