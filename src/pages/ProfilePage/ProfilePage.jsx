import './ProfilePage.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap'
import userService from './../../services/user.services'
import ProfileCard from '../../components/CardProfile/CardProfile'
import Purchases from '../../components/SectionPurchases/Purchases'
import Sellings from '../../components/SectionSellings/Sellings'
import Favourites from '../../components/SectionFavourites/Favourites'
import { Link, useParams } from 'react-router-dom'
import Loader from './../../components/Loader/Loader'

const ProfilePage = () => {
	const { user } = useContext(AuthContext)
	const { user_id } = useParams()
	const [infoUser, setInfoUser] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [isCurrentUser, setIsCurrentUser] = useState()
	const [isFavouriteSeller, setISFavouriteSeller] = useState()
	const [key, setKey] = useState('sales')
	const { logout } = useContext(AuthContext)

	const profilInfo = {
		id: infoUser._id,
		firstName: infoUser.firstName,
		lastName: infoUser.lastName,
		averageValoration: infoUser.valorations?.avgValoration,
		profilImage: infoUser.avatar,
	}

	const favourites = {
		products: infoUser.favouriteProducts,
		sellers: infoUser.favouriteSellers,
	}

	const sellings = {
		selling: infoUser.sellingProducts,
		sold: infoUser.soldProducts,
	}

	const purchases = infoUser.purchasedProducts

	useEffect(() => {
		loadUser()
		isFavSeller()
		setKey('sales')
	}, [user_id, isCurrentUser])

	const loadUser = () => {
		userService
			.getUser(user_id)
			.then(({ data }) => {
				setInfoUser(data)
				setIsLoading(false)
				if (user_id !== user._id) setIsCurrentUser(false)
				if (user_id === user._id) setIsCurrentUser(true)
			})
			.catch((err) => console.log(err))
	}

	const isFavSeller = () => {
		userService
			.getFavSel(user._id, user_id)
			.then(({ data }) => {
				setISFavouriteSeller(data)
			})
			.catch((err) => console.log(err))
	}

	const handleFavClick = () => {
		if (isFavouriteSeller) {
			userService
				.removeFromFavSel(user._id, user_id)
				.then(() => {
					setISFavouriteSeller(false)
				})
				.catch((err) => console.log(err))
		} else {
			userService
				.addToFavSel(user._id, user_id)
				.then(() => {
					setISFavouriteSeller(true)
				})
				.catch((err) => console.log(err))
		}
	}

	const handleDeleteButton = () => {
		logout()

		userService
			.deleteUser(infoUser._id)
			.then(() => console.log('el usuario se ha borrado'))
			.catch((err) => console.log(err))
	}

	return (
		<div className='main'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Row className='top-section'>
						<Col xs={12} sm={5}>
							<ProfileCard {...profilInfo} />
						</Col>

						<Col xs={12} sm={2}>
							<Link to={`/profile/edit/${user_id}`} className='notDecoration'>
								Editar Perfil
							</Link>

							<Nav.Link onClick={handleDeleteButton}>Eliminar perfil</Nav.Link>
						</Col>

						<Col xs={12} sm={5}>
							{isCurrentUser && (
								<>
									<Link to={`/profile/new_product`} className='notDecoration'>
										<Button>+ Añadir producto</Button>
									</Link>
								</>
							)}
						</Col>
					</Row>

					<Row className='bottom-section pt-5 justify-content-center'>
						<Tab.Container id='profile-sections' activeKey={key}>
							<Row className='pb-2'>
								<Col>
									<Nav.Link
										eventKey='sales'
										onClick={() => {
											setKey('sales')
										}}
									>
										Ventas
									</Nav.Link>
								</Col>
								{isCurrentUser && (
									<>
										<Col>
											<Nav.Link
												eventKey='purchases'
												onClick={() => {
													setKey('purchases')
												}}
											>
												Compras
											</Nav.Link>
										</Col>
										<Col>
											<Nav.Link
												eventKey='favourites'
												onClick={() => {
													setKey('favourites')
												}}
											>
												Favoritos
											</Nav.Link>
										</Col>
									</>
								)}
							</Row>
							<hr />
							<Row className='tabs-content px-5'>
								<Col md={12} className='pt-3'>
									<Tab.Content>
										<Tab.Pane eventKey='sales'>
											<Sellings {...sellings} />
										</Tab.Pane>

										<Tab.Pane eventKey='purchases'>
											<Purchases purchases={purchases} />
										</Tab.Pane>

										<Tab.Pane eventKey='favourites'>
											<Favourites favourites={favourites} />
										</Tab.Pane>
									</Tab.Content>
								</Col>
							</Row>
						</Tab.Container>
					</Row>
				</>
			)}
		</div>
	)
}

export default ProfilePage
