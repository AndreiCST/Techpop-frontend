import { Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/FormLogin/FormLogin'
import './LoginPage.css'

const LoginPage = () => {
	return (
		<Row className='login-page pt-5'>
			<Col
				xs={{ offset: 1, span: 10 }}
				sm={{ offset: 2, span: 8 }}
				md={{ offset: 3, span: 6 }}
				lg={{ offset: 4, span: 4 }}
			>
				<h1>Login</h1>

				<div className='login-form'>
					<LoginForm />
				</div>
			</Col>
		</Row>
	)
}

export default LoginPage
