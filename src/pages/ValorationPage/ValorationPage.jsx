import { useState, useContext, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import valorationService from "../../services/valoration.services"
import productService from "../../services/product.services"
import FormError from "../../components/FormError/FormError"
import './ValorationPage.css'
import { AuthContext } from "../../contexts/auth.context"


const ValorationFormPage = () => {

    const [valorationData, setValorationData] = useState({ stars: '', description: '' })
    const [productInfo, setProductInfo] = useState()
    const [errors, setErrors] = useState([])

    const { user } = useContext(AuthContext)
    const { product_id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        loadProductInfo()
    }, [])

    const loadProductInfo = () => {
        productService
            .getOneProduct(product_id)
            .then(({ data }) => setProductInfo(data.owner._id))
            .catch(err => console.log(err))

    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setValorationData({ ...valorationData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        valorationService
            .saveValoration(product_id, productInfo, user._id, valorationData)
            .then(() => navigate(`/profile/${user._id}`))
            .catch(err => console.log(err))


    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="stars">
                    <Form.Label>Valoracion:</Form.Label>
                    <Form.Control type="number" value={valorationData.stars} onChange={handleInputChange} name="stars" />
                    <Form.Label>Valora del 1 al 5 tu experiencia</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripcion:</Form.Label>
                    <Form.Control type="text" value={valorationData.description} onChange={handleInputChange} name="description" />
                </Form.Group>

                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

                <div className="d-grid">
                    <Button variant="dark" type="submit" >Confirmar valoracion</Button>
                </div>

            </Form>
        </>
    )
}

export default ValorationFormPage