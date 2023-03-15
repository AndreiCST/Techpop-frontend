import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import './Navigation.css'

const Navigation = () => {
    const navbarStyle = 'dark'
    const { user, logout } = useContext(AuthContext)

    return (

        <Navbar expand="md" className='navbar'>
            <Container>
                <Navbar.Brand href="/">Techpop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Link to="/" className='notDecoration'>
                            <Nav.Link as="span" className='navBtn'>Inicio</Nav.Link>
                        </Link>

                        <Link to="/search" className='notDecoration'>
                            <Nav.Link as="span" className='navBtn'>Buscar</Nav.Link>
                        </Link>

                        {
                            user

                                ?

                                <>

                                    <Link to={`/profile/${user._id}`} className='notDecoration'>
                                        <Nav.Link as="span" className='navBtn'>Perfil</Nav.Link>
                                    </Link>

                                    <Nav.Link as="span" onClick={logout} className='navBtn notDecoration'>Cerrar sesión</Nav.Link>

                                </>

                                :

                                <>

                                    <Link to="/login" className='notDecoration'>
                                        <Nav.Link as="span" className='navBtn'>Iniciar sesión</Nav.Link>
                                    </Link>

                                    <Link to="/signup" className='notDecoration'>
                                        <Nav.Link as="span" className='navBtn'>Registrarme</Nav.Link>
                                    </Link>

                                </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >

    )
}

export default Navigation