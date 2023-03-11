import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {
    const navbarStyle = 'dark'
    const { user, logout } = useContext(AuthContext)

    return (
        <Navbar bg={navbarStyle} variant={navbarStyle} expand="md" className='mb-4'>
            <Container>
                <Navbar.Brand href="#">Coasters App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">
                            <Nav.Link as="span">Inicio</Nav.Link>
                        </Link>
                        <Link to="/search">
                            <Nav.Link as="span">Buscar</Nav.Link>
                        </Link>

                        {
                            user
                                ?
                                <>
                                    <Link to={`/profile/${user._id}`}>
                                        <Nav.Link as="span">Perfil</Nav.Link>
                                    </Link>
                                    <Nav.Link as="span" onClick={logout}>Cerrar sesión</Nav.Link>
                                </>
                                :
                                <>
                                    <Link to="/login">
                                        <Nav.Link as="span">Iniciar sesión</Nav.Link>
                                    </Link>
                                    <Link to="/signup">
                                        <Nav.Link as="span">Registrarme</Nav.Link>
                                    </Link>
                                </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation