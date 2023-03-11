import { useContext, useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import productService from '../../services/product.services'
import userSerice from '../../services/user.services'
import uploadServices from '../../services/upload.services'

import FormError from '../FormError/FormError'

import './NewProductForm.css'

const NewProductForm = ({ fireFinalActions }) => {

    const { user } = useContext(AuthContext)

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        images: [],
        price: '',
        stateOfProduct: '',
        category: '',
        subcategory: ''
    })

    const [errors, setErrors] = useState([])
    const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        for (let key in e.target.files) {
            formData.append('imageData', e.target.files[key])
        }

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setProductData({ ...productData, images: res.data })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
            })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        productService
            .saveProduct(productData, user._id)
            .then(() => navigate(`/profile/${user._id}`))
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    return (
        <>
            <h2>New Product Form</h2>
            <hr />

            <Form onSubmit={handleFormSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" value={productData.name} onChange={handleInputChange} name="name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Precio:</Form.Label>
                        <Form.Control type="text" value={productData.price} onChange={handleInputChange} name="price" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="images" >
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} multiple />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripcion:</Form.Label>
                    <Form.Control type="text" value={productData.description} onChange={handleInputChange} name="description" />
                </Form.Group>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Categoria:</Form.Label>
                        <Form.Select aria-label="Default select example" value={productData.category} onChange={handleInputChange} name="category">
                            <option>Seleccionar</option>
                            <option value="Informatica">Informatica</option>
                            <option value="Electrodomesticos">Electrodomesticos</option>
                            <option value="Telefonia">Telefonia</option>
                            <option value="Consola">Consola</option>
                            <option value="Otros">Otros</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="subcategory">
                        <Form.Label>Subategoria:</Form.Label>
                        <Form.Select aria-label="Default select example" value={productData.subcategory} onChange={handleInputChange} name="subcategory">
                            <option>Seleccionar</option>
                            <option value="Producto">Producto</option>
                            <option value="Accesorio">Accesorio</option>
                            <option value="Videojuego">Videojuego</option>
                            <option value="Otros">Otros</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="stateOfProduct">
                        <Form.Label>Estado del Producto:</Form.Label>
                        <Form.Select aria-label="Default select example" value={productData.stateOfProduct} onChange={handleInputChange} name="stateOfProduct">
                            <option>Seleccionar</option>
                            <option value="NEW">Nuevo</option>
                            <option value="ALMOSTNEW">Casi Nuevo</option>
                            <option value="USED">Usado</option>
                            <option value="VERYUSED">Muy Usado</option>
                        </Form.Select>
                    </Form.Group>
                </Row>


                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando Imagen...' : 'Crear Producto'}</Button>
                </div>

            </Form>
        </>
    )

}

export default NewProductForm