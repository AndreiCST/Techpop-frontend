import { useContext, useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import productService from '../../services/product.services'
import uploadServices from '../../services/upload.services'
import { CATEGORIES, SUBCATEGORIES, STATEOFPRODUCT } from '../../consts'

import FormError from '../FormError/FormError'

const NewProductForm = () => {
	const { user } = useContext(AuthContext)

	const [productData, setProductData] = useState({
		name: '',
		description: '',
		images: ['', '', '', '', '', '', '', ''],
		price: '',
		stateOfProduct: '',
		category: '',
		subcategory: '',
	})
	const [errors, setErrors] = useState([])
	const [loadingImage, setLoadingImage] = useState(false)

	const navigate = useNavigate()

	const handleInputChange = (e) => {
		const { value, name } = e.target
		setProductData({ ...productData, [name]: value })
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()

		productService
			.saveProduct(productData, user._id)
			.then(() => navigate(`/profile/${user._id}`))
			.catch((err) => setErrors(err.response.data.errorMessages))
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

	const handleDeleteImage = (index) => {
		const newImages = productData.images.map((e, i) => {
			if (i === index) {
				return ''
			} else {
				return e
			}
		})

		setProductData({ ...productData, images: newImages })
	}

	return (
		<>
			<Form onSubmit={handleFormSubmit}>
				<Row className='mb-3'>
					<Form.Group as={Col} sm={12} md={6} controlId='name'>
						<Form.Label>Nombre:</Form.Label>
						<Form.Control
							type='text'
							value={productData.name}
							onChange={handleInputChange}
							name='name'
						/>
					</Form.Group>
					<Form.Group as={Col} sm={12} md={6} controlId='price'>
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
					<Form.Group as={Col} sm={12} md={4} controlId='category'>
						<Form.Label>Categoria:</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={productData.category}
							onChange={handleInputChange}
							name='category'
						>
							<option>Seleccionar</option>
							{CATEGORIES.map((elm) => {
								return (
									<option value={elm} key={elm}>
										{elm}
									</option>
								)
							})}
						</Form.Select>
					</Form.Group>

					{productData.category !== '' && productData.category !== 'Seleccionar' && (
						<Form.Group as={Col} sm={12} md={4} controlId='subcategory'>
							<Form.Label>Subategoria:</Form.Label>
							<Form.Select
								aria-label='Default select example'
								value={productData.subcategory}
								onChange={handleInputChange}
								name='subcategory'
							>
								<option>Seleccionar</option>
								{SUBCATEGORIES[productData.category].map((elm) => {
									return (
										<option value={elm} key={elm}>
											{elm}
										</option>
									)
								})}
							</Form.Select>
						</Form.Group>
					)}

					<Form.Group as={Col} sm={12} md={4} controlId='stateOfProduct'>
						<Form.Label>Estado del Producto:</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={productData.stateOfProduct}
							onChange={handleInputChange}
							name='stateOfProduct'
						>
							<option>Seleccionar</option>
							{STATEOFPRODUCT.map((elm) => {
								return (
									<option value={elm} key={elm}>
										{elm}
									</option>
								)
							})}
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className='py-5 w-100 m-0 image-list d-flex justify-content-center'>
					{Array.from({ length: 8 }).map((e, index) => {
						const placeholder =
							'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg'

						let coverImg
						let state

						if (productData.images[index] === '') {
							coverImg = placeholder
						} else {
							coverImg = productData.images[index]
						}

						if (productData.images[index] !== '') {
							state = false
						} else if (productData.images[index - 1] === '') {
							state = true
						}

						const stateStyle = state ? '0.5' : '1'

						return (
							<Col key={index} xs={6} sm={5} md={3} className='p-2 image-container'>
								<input
									disabled={state}
									className='image'
									type='file'
									style={{
										backgroundImage: `url(${coverImg})`,
										opacity: stateStyle,
									}}
									onChange={(e) => handleFileUpload(e, index)}
								/>
								<Button
									className='delete-button'
									onClick={() => handleDeleteImage(index)}
									variant='danger'
								>
									X
								</Button>
							</Col>
						)
					})}
				</Row>

				{errors.length > 0 && (
					<FormError>
						{errors.map((elm) => (
							<p>{elm}</p>
						))}
					</FormError>
				)}

				<div className='d-grid'>
					<Button variant='dark' type='submit' disabled={loadingImage}>
						{loadingImage ? 'Cargando Imagen...' : 'Crear Producto'}
					</Button>
				</div>
			</Form>
		</>
	)
}

export default NewProductForm
