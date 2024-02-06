import './Navigation.css'
import logo from './../../assets/imagenes/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Offcanvas, Row } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {
	const { user, logout } = useContext(AuthContext)
	const [show, setShow] = useState(false)
	const navigate = useNavigate()

	const HandleLogOut = () => {
		logout()
		navigate('/')
	}

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<div className='nav-bar'>
			<Row className='position-relative'>
				<Col xs={2} className='d-flex'>
					<Link to='/' className='not-decoration brand'>
						 Techpop
					</Link>
				</Col>
				<Col xs={8} md={8} lg={10} className='pt-4 main-menu d-flex justify-content-end'>
					<Link to='/' className='not-decoration nav-btn'>
						Inicio
					</Link>
					<Link to='/search' className='not-decoration nav-btn ps-5'>
						Buscar
					</Link>
					{user ? (
						<>
							<Link to={`/profile/${user._id}`} className='not-decoration nav-btn ps-5'>
								Perfil
							</Link>
							<Link
								as='span'
								onClick={HandleLogOut}
								className='not-decoration nav-btn ps-5'
							>
								Cerrar sesión
							</Link>
						</>
					) : (
						<>
							<Link to='/login' className='not-decoration nav-btn ps-5'>
								log in
							</Link>
							<Link to='/signup' className='not-decoration nav-btn ps-5'>
								sign in
							</Link>
						</>
					)}
				</Col>
				<Col xs={2} className='pt-4 offcanvas-menu-btn'>
					<Button variant='' className='border border-2' onClick={handleShow}>
						Menu
					</Button>
				</Col>
			</Row>
			<Offcanvas
				placement='end'
				className='offcanvas-menu'
				show={show}
				onHide={handleClose}
				responsive='lg'
			>
				<Offcanvas.Header closeButton></Offcanvas.Header>
				<Link to='/' className='not-decoration nav-btn offcanvas-btn pt-5 w-25'>
					Inicio
				</Link>
				<Link to='/search' className='not-decoration nav-btn offcanvas-btn w-50'>
					Buscar
				</Link>
				{user ? (
					<>
						<Link
							to={`/profile/${user._id}`}
							className='not-decoration nav-btn offcanvas-btn w-75'
						>
							Perfil
						</Link>
						<Link
							as='span'
							onClick={HandleLogOut}
							className='not-decoration nav-btn offcanvas-btn'
						>
							Cerrar sesión
						</Link>
					</>
				) : (
					<>
						<Link to='/login' className='not-decoration nav-btn offcanvas-btn w-75'>
							log in
						</Link>
						<Link to='/signup' className='not-decoration nav-btn offcanvas-btn'>
							sign in
						</Link>
					</>
				)}
			</Offcanvas>
		</div>
	)
}

export default Navigation
