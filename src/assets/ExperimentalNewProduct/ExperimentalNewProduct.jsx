import { useContext, useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import productService from '../../services/product.services'
import uploadServices from '../../services/upload.services'
import FormError from '../FormError/FormError'
import genericImage from './../../assets/imagenes/genericImage.png'


import './ExperimentalNewProduct.css'

const ExperimentalNewProduct = ({ fireFinalActions }) => {

    const { user } = useContext(AuthContext)

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        images: [],
        price: '',
        stateOfProduct: ''
    })

    const [errors, setErrors] = useState([])
    const [loadingImage, setLoadingImage] = useState(false)
    const [previewImages, setPreviewImages] = useState(Array.from({ length: 5 }).fill(''))

    const [currentImage, setCurrentImage] = useState(genericImage)

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

                // update preview images
                let newPreviewImages = [...previewImages]
                for (let i = 0; i < e.target.files.length; i++) {
                    if (i < 5) {
                        const reader = new FileReader()
                        reader.readAsDataURL(e.target.files[i])
                        reader.onload = () => {
                            newPreviewImages[i] = reader.result
                            setPreviewImages(newPreviewImages)
                        }
                    }
                }

                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        productService
            .saveProduct(productData)
            .then(({ data }) => {
                fireFinalActions()
                // navigate(`/profile/${user._id}`)
                console.log(productData)
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleImageClick = (newImage) => {
        setCurrentImage(newImage)
    }


    return (
        <>
            <h2>New Product Form</h2>
            <hr />

            <Form onSubmit={handleFormSubmit} className='mb-9'>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" value={productData.name} onChange={handleInputChange} name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripcion:</Form.Label>
                    <Form.Control type="text" value={productData.description} onChange={handleInputChange} name="description" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Precio:</Form.Label>
                        <Form.Control type="text" value={productData.price} onChange={handleInputChange} name="price" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="stateOfProduct">
                        <Form.Label>Estado del Producto:</Form.Label>
                        <Form.Control type="text" value={productData.stateOfProduct} onChange={handleInputChange} name="stateOfProduct" />
                    </Form.Group>
                </Row>

                {/* <Form.Group className="mb-3" controlId="image" >
                    <Form.Label>Imagenes</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} multiple />
                </Form.Group> */}

                <Row className="mb-3">

                    <Form.Group className="image-preview" onChange={handleFileUpload} onClick={() => handleImageClick('genericImage')}>
                        <img src={currentImage} alt="Preview" width="150" height="150" />
                    </Form.Group>
                    <Form.Group className="image-preview" onChange={handleFileUpload} onClick={() => handleImageClick('genericImage.')}>
                        <img src={currentImage} alt="Preview" width="150" height="150" />
                    </Form.Group>
                    <Form.Group className="image-preview" onChange={handleFileUpload} onClick={() => handleImageClick('genericImage')}>
                        <img src={currentImage} alt="Preview" width="150" height="150" />
                    </Form.Group>
                    <Form.Group className="image-preview" onChange={handleFileUpload} onClick={() => handleImageClick('genericImage')}>
                        <img src={currentImage} alt="Preview" width="150" height="150" />
                    </Form.Group>
                    <Form.Group className="image-preview" onChange={handleFileUpload} onClick={() => handleImageClick('genericImage')}>
                        <img src={currentImage} alt="Preview" width="150" height="150" />
                    </Form.Group>

                </Row>


                {/* <Row>
                    {
                        Array.isArray(productData.images) && productData.images.map((image, index) => (
                            <Col key={index} md={2}>
                                <img src={image} alt={`imagen ${index}`} className="img-thumbnail" style={{ width: '400px', height: '200px', objectFit: 'cover' }} />
                            </Col>
                        ))}
                </Row> */}

                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

                <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando Imagen...' : 'Crear Producto'}</Button>
                </div>

            </Form>
        </>
    )

}

export default ExperimentalNewProduct
