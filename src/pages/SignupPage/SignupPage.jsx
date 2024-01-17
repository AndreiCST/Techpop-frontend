import { Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/FormSignIn/FormSignIn'
import './SignupPage.css'
import logo from '../../assets/imagenes/logo.jpg'

const SignupPage = () => {
	return (
		<Row className='signin-page pt-5'>
			<Col
				xs={{ offset: 1, span: 10 }}
				sm={{ offset: 2, span: 8 }}
				md={{ offset: 3, span: 6 }}
				lg={{ offset: 4, span: 4 }}
			>
				<img src={logo} alt='' />
				<h1>Sign in to Techpop</h1>

				<div className='signin-form d-flex justify-content-center mt-5'>
					<SignupForm />
				</div>
			</Col>
		</Row>
	)
}

export default SignupPage
