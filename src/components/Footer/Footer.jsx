import { Col, Row } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
	return (
		<footer className='p-2'>
			<Row className='m-0'>
				<Col>
					<p>&copy; 2024 TechPop. Todos los derechos reservados.</p>
					<a href='/'>Términos y Condiciones</a>
					<a href='/'>Política de Privacidad</a>
				</Col>
				<Col>
					<p>Contacto: support@techpop.com</p>
					<p>Teléfono: +123 456 7890</p>
				</Col>
				<Col>
					<a href='/'>Inicio</a>
					<a href='/'>Productos</a>
					<a href='/'>Categorías</a>
					<a href='/' target='_blank' rel='noopener noreferrer'>
						<img src='facebook-icon.png' alt='Facebook' />
					</a>
				</Col>
			</Row>
		</footer>
	)
}

export default Footer
