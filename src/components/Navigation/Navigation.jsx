import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const navbarStyle = 'dark'

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
                        <Link to="/profile">
                            <Nav.Link as="span">Perfil</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation