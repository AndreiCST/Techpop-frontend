import { useState, useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import productService from '../../services/product.services'
import uploadServices from '../../services/upload.services'
import FormError from '../FormError/FormError.jsx'
import './ProductEditForm.css'

const EditProductForm = ({ product }) => {

    const [productData, setProductData] = useState({
        name: product.name,
        description: product.description,
        // images: product.images,
        price: product.price,
        stateOfProduct: product.stateOfProduct,
        category: product.category,
        subcategory: product.subcategory
    })

    const { user } = useContext(AuthContext)

    const { product_id } = useParams()

    const [errors, setErrors] = useState([])
    // const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

    function handleInputChange(e) {
        const { value, name } = e.target
        setProductData({ ...productData, [name]: value })
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

        productService
            .updateProduct(product_id, productData)
            .then(() => {
                navigate(`/profile/${user._id}`)
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    return (
        <>
            <h1>Edit Product Form</h1>
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

                {/* <Row>
                    {productData.images.map((image, index) => (
                        // <Link onClick={(e) => handleImageChange(index, e)}>
                        <Form.Group key={index} as={Col} lg={2} >
                            <Form.Label>Image {index + 1}</Form.Label>
                            <div onClick={(e) => handleImageChange(index, e)}>
                                <img
                                    src={image}
                                    alt={`Image ${index}`}
                                    className="imageChange"
                                />
                            </div>
                        </Form.Group>
                        // </Link>
                    ))}
                </Row> */}

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripcion:</Form.Label>
                    <Form.Control type="text" value={productData.description} onChange={handleInputChange} name="description" />
                </Form.Group>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Categoria:</Form.Label>
                        <Form.Select aria-label="Default select example" value={productData.category} onChange={handleInputChange} name="category">
                            <option>{productData.category}</option>
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
                            <option>{productData.subcategory}</option>
                            <option value="Producto">Producto</option>
                            <option value="Accesorio">Accesorio</option>
                            <option value="Videojuego">Videojuego</option>
                            <option value="Otros">Otros</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="stateOfProduct">
                        <Form.Label>Estado del Producto:</Form.Label>
                        <Form.Select aria-label="Default select example" value={productData.stateOfProduct} onChange={handleInputChange} name="stateOfProduct">
                            <option>{productData.stateOfProduct}</option>
                            <option value="NEW">Nuevo</option>
                            <option value="ALMOSTNEW">Casi Nuevo</option>
                            <option value="USED">Usado</option>
                            <option value="VERYUSED">Muy Usado</option>
                        </Form.Select>
                    </Form.Group>
                </Row>


                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

                <Button variant="dark" type="submit">Editar Producto</Button>

                {/* <div className="d-grid">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando Imagen...' : 'Editar Producto'}</Button>
                </div> */}

            </Form >
        </>
    )
}

export default EditProductForm