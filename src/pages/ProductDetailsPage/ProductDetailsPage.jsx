import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Carousel, ListGroup, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import StarValoration from '../../components/StarValoration/StarValoration'
import userService from '../../services/user.services'
import productService from '../../services/product.services'
import transactionService from '../../services/transactions.services'
import './ProductDetailsPage.css'

const ProductPage = () => {
	const { product_id } = useParams()
	const { user } = useContext(AuthContext)
	const [product, setProduct] = useState([])
	const [productOwner, setProductOwner] = useState({})
	const [isFavouriteProducts, setIsFavouriteProducts] = useState({})
	const [isOwner, setIsOwner] = useState(false)
	const [showReq, setShowReq] = useState(false)
	const [showBuy, setShowBuy] = useState(false)
	const [isRequested, setIsRequested] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const loadProduct = async () => {
			try {
				const { data } = await productService.getOneProduct(product_id)
				setProduct(data)
				setProductOwner(data.owner)

				const transactions = await transactionService.getTransactions(product.buyRequest)
				transactions.data.forEach(({ buyer }) => {
					if (buyer?._id === user?._id) {
						setIsRequested(true)
						return
					}
				})

				if (user) {
					isFavProduct()
				}
				if (data?.owner?._id === user?._id) {
					setIsOwner(true)
				}
			} catch (error) {
				console.log(error)
			}
		}

		loadProduct()
	}, [user, product_id, isFavouriteProducts])

	const isFavProduct = () => {
		userService
			.getFavProd(user._id, product_id)
			.then((data) => {
				setIsFavouriteProducts(data.data)
			})
			.catch((err) => console.log(err))
	}

	const handleFavClick = () => {
		if (isFavouriteProducts) {
			userService
				.removeFromFavProd(user._id, product_id)
				.then(() => {
					setIsFavouriteProducts(false)
				})
				.catch((err) => console.log(err))
		} else {
			userService
				.addToFavProd(user._id, product_id)
				.then(() => {
					setIsFavouriteProducts(true)
				})
				.catch((err) => console.log(err))
		}
	}

	const handleEditClick = () => {
		navigate(`/product/edit/${product_id}`)
	}

	const HandleBuyButton = () => {
		transactionService
			.startTrans(product_id, user._id, productOwner._id)
			.then()
			.catch((err) => console.log(err))
	}

	const handleDeleteClick = () => {
		productService
			.deleteProduct(product_id)
			.then(() => navigate(`/profile/${user._id}`))
			.catch((err) => console.log(err))
	}

	const handleCloseReq = () => setShowReq(false)
	const handleShowReq = () => {
		if (!product.buyRequest.length) {
			setShowReq(true)
		} else {
			navigate(`/buy-requests/${product_id}`)
		}
	}

	const handleCloseBuy = () => navigate('/')
	const handleShowBuy = () => {
		HandleBuyButton()
		setShowBuy(true)
	}

	return (
		<div className='pt-5 prod-details px-5 pb-5'>
			<Row className='pb-5'>
				<Col xs={12} sm={10} md={10}>
					<h1 className='mb-4 prod-tittle'>{product.name}</h1>
				</Col>

				{isOwner && (
					<Col xs={12} sm={2} md={2}>
						<Button variant='primary' onClick={handleShowReq}>
							Solicitudes de compra
						</Button>

						<Modal show={showReq} onHide={handleCloseReq}>
							<Modal.Header closeButton></Modal.Header>
							<Modal.Body>El producto aun no tiene solicitudes de compra</Modal.Body>
						</Modal>
					</Col>
				)}
			</Row>

			<Row>
				<Carousel className='prod-carousel'>
					{product?.images?.map((elm, index) => {
						if (elm !== '') {
							return (
								<Carousel.Item key={index}>
									<img src={elm} alt={`Slide ${elm._id}`} />
								</Carousel.Item>
							)
						}
					})}
				</Carousel>
			</Row>

			<Row className='pt-5'>
				<Col xs={12} md={6}>
					<p className='description'>{product.description}</p>
				</Col>
				<Col md={2}></Col>
				<Col xs={12} md={4} className='mb-4 pt-5'>
					<div className='pb-5'>
						<h2 className='price'>Precio: {product.price}€</h2>
						<p className='state'>State: {product.stateOfProduct}</p>

						<Link to={`/profile/${productOwner._id}`} className='owner'>
							<p className='mb-0'>
								{productOwner.firstName} {productOwner.lastName}
							</p>
							<StarValoration stars={productOwner.valorations?.avgValoration} />
						</Link>
					</div>

					<div className=''>
						{!isOwner && product.inSale === true && user && (
							<Row className='buttons'>
								{product.buyRequest && (
									<Col xs={12} md={6}>
										<Button
											disabled={isRequested}
											onClick={handleShowBuy}
											className='ms-3'
											variant='bg-secondary '
										>
											<img
												src='https://cdn.icon-icons.com/icons2/1580/PNG/512/2849824-basket-buy-market-multimedia-shop-shopping-store_107977.png'
												alt=''
											/>
											<Modal show={showBuy} onHide={handleCloseBuy}>
												<Modal.Header closeButton></Modal.Header>
												<Modal.Body>Se ha enviado la solicitud al vendedor</Modal.Body>
											</Modal>
										</Button>
										<Button onClick={handleFavClick} variant='bg-secondary '>
											<img
												src={
													isFavouriteProducts
														? 'https://cdn.icon-icons.com/icons2/38/PNG/512/like_favorite_heart_5759.png'
														: 'https://cdn.icon-icons.com/icons2/2073/PNG/512/heart_like_love_twitter_icon_127132.png'
												}
												alt=''
											/>
										</Button>
									</Col>
								)}
							</Row>
						)}

						{isOwner && product.inSale === true && (
							<Row className='buttons'>
								<Col xs={12} md={4}>
									<Button
										onClick={handleEditClick}
										className='mt-2'
										variant='bg-secondary '
									>
										<img
											src='https://cdn.icon-icons.com/icons2/520/PNG/512/Document-edit_icon-icons.com_52127.png'
											alt=''
										/>
									</Button>
									<Button
										onClick={handleDeleteClick}
										className='mt-2'
										variant='bg-secondary'
									>
										<img
											src='https://cdn.icon-icons.com/icons2/868/PNG/512/trash_bin_icon-icons.com_67981.png'
											alt=''
										/>
									</Button>
								</Col>
							</Row>
						)}
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default ProductPage
