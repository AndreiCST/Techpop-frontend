import './Navigation.css'
import logo from './../../assets/imagenes/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Nav, Navbar, Row } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {
	const { user, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	const HandleLogOut = () => {
		logout()
		navigate('/')
	}

	return (
		<Navbar sticky='top' expand='md' className='p-0'>
			<Row className='navbar'>
				<Col xs={{ span: 4, offset: 0 }} className=''>
					<Navbar.Brand href='/' className='brand'>
						<img src={logo} alt='' /> Techpop
					</Navbar.Brand>
				</Col>
				<Col xs={{ span: 2, offset: 6 }} md={{ span: 4, offset: 4 }} className=''>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					<Navbar.Collapse id='basic-navbar-nav'>
						<div className='nav-buttons d-flex flex-row justify-content-around '>
							<Link to='/' className='not-decoration nav-button'>
								Inicio
							</Link>
							<Link to='/search' className='not-decoration nav-button'>
								Buscar
							</Link>

							{user ? (
								<>
									<Link to={`/profile/${user._id}`} className='not-decoration nav-button'>
										Perfil
									</Link>
									<Nav.Link
										as='span'
										onClick={HandleLogOut}
										className='not-decoration nav-button'
									>
										Cerrar sesión
									</Nav.Link>
								</>
							) : (
								<>
									<Link to='/login' className='not-decoration nav-button'>
										log in
									</Link>
									<Link to='/signup' className='not-decoration nav-button'>
										sign in
									</Link>
								</>
							)}
						</div>
					</Navbar.Collapse>
				</Col>
			</Row>
		</Navbar>
	)
}

export default Navigation
