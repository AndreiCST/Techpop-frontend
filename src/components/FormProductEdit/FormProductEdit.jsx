import { useState, useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context.jsx'
import productService from '../../services/product.services.js'
import uploadServices from '../../services/upload.services.js'
import FormError from '../FormError/FormError.jsx'
import './FormProductEdit.css'

const EditProductForm = ({ product }) => {
	const [productData, setProductData] = useState({
		name: product.name,
		description: product.description,
		images: product.images,
		price: product.price,
		stateOfProduct: product.stateOfProduct,
		category: product.category,
		subcategory: product.subcategory,
	})
	const { user } = useContext(AuthContext)
	const { product_id } = useParams()
	const [errors, setErrors] = useState([])
	const [loadingImage, setLoadingImage] = useState(false)
	const navigate = useNavigate()

	function handleInputChange(e) {
		const { value, name } = e.target
		setProductData({ ...productData, [name]: value })
	}

	const handleFileUpload = (e, index) => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append('imageData', e.target.files[0])

		uploadServices
			.uploadimage(formData)
			.then(({ data }) => {
				const newImages = productData.images.map((e, i) => {
					if (i === index) {
						return data[0]
					} else {
						return e
					}
				})

				setProductData({ ...productData, images: newImages })
				setLoadingImage(false)
			})
			.catch((err) => console.log(err))
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()

		productService
			.updateProduct(product_id, productData)
			.then(() => {
				navigate(`/profile/${user._id}`)
			})
			.catch((err) => setErrors(err.response.data.errorMessages))
	}

	return (
		<>
			<h1>Edit Product Form</h1>

			<Form className='pt-5' onSubmit={handleFormSubmit}>
				<Row className='mb-3'>
					<Form.Group as={Col} controlId='name'>
						<Form.Label>Nombre:</Form.Label>
						<Form.Control
							type='text'
							value={productData.name}
							onChange={handleInputChange}
							name='name'
						/>
					</Form.Group>
					<Form.Group as={Col} controlId='price'>
						<Form.Label>Precio:</Form.Label>
						<Form.Control
							type='text'
							value={productData.price}
							onChange={handleInputChange}
							name='price'
						/>
					</Form.Group>
				</Row>

				<Form.Group className='mb-3' controlId='description'>
					<Form.Label>Descripcion:</Form.Label>
					<Form.Control
						type='text'
						value={productData.description}
						onChange={handleInputChange}
						name='description'
					/>
				</Form.Group>

				<Row className='mb-3'>
					<Form.Group as={Col} controlId='category'>
						<Form.Label>Categoria:</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={productData.category}
							onChange={handleInputChange}
							name='category'
						>
							<option>{productData.category}</option>
							<option value='Informatica'>Informatica</option>
							<option value='Electrodomesticos'>Electrodomesticos</option>
							<option value='Telefonia'>Telefonia</option>
							<option value='Consola'>Consola</option>
							<option value='Otros'>Otros</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId='subcategory'>
						<Form.Label>Subategoria:</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={productData.subcategory}
							onChange={handleInputChange}
							name='subcategory'
						>
							<option>{productData.subcategory}</option>
							<option value='Producto'>Producto</option>
							<option value='Accesorio'>Accesorio</option>
							<option value='Videojuego'>Videojuego</option>
							<option value='Otros'>Otros</option>
						</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId='stateOfProduct'>
						<Form.Label>Estado del Producto:</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={productData.stateOfProduct}
							onChange={handleInputChange}
							name='stateOfProduct'
						>
							<option>{productData.stateOfProduct}</option>
							<option value='NEW'>Nuevo</option>
							<option value='ALMOSTNEW'>Casi Nuevo</option>
							<option value='USED'>Usado</option>
							<option value='VERYUSED'>Muy Usado</option>
						</Form.Select>
					</Form.Group>
				</Row>

				<Row className='py-5 w-100 m-0 image-list d-flex justify-content-center'>
					{Array.from({ length: 8 }).map((e, index) => {
						const placeholder =
							'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg'

						let coverImg

						if (productData.images[index] === '') {
							coverImg = placeholder
						} else {
							coverImg = productData.images[index]
						}

						return (
							<Col key={index} xs={6} sm={5} md={3} className='p-2 image-container'>
								<input
									className='image'
									type='file'
									style={{
										backgroundImage: `url(${coverImg})`,
									}}
									onChange={(e) => handleFileUpload(e, index)}
								/>
							</Col>
						)
					})}
				</Row>

				{errors.length > 0 && (
					<FormError className='py-5'>
						{errors.map((elm) => (
							<p>{elm}</p>
						))}
					</FormError>
				)}

				<Button variant='dark' type='submit' disabled={loadingImage}>
					{loadingImage ? 'Cargando Imagen...' : 'Editar Producto'}
				</Button>
			</Form>
		</>
	)
}

export default EditProductForm
