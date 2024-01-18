import { Col } from 'react-bootstrap'
import './ErrorPage.css'

const ErrorPage = () => {
	return (
		<div className='error-page d-flex flex-column pt-5 px-5'>
			<Col>
				<img
					className='error-logo'
					src='https://static.vecteezy.com/system/resources/previews/015/131/133/original/crossing-sign-error-404-png.png'
					alt=''
				/>
			</Col>
			<Col>
				<h1>La pagina que estas buscando no existe</h1>
			</Col>
		</div>
	)
}

export default ErrorPage
