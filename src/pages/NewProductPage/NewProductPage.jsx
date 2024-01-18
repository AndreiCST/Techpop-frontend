import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NewProductForm from '../../components/FormNewProduct/FormNewProduct'

import './NewProductPage.css'

const NewProduct = () => {
	const navigate = useNavigate()

	return (
		<div className='new-prod-page pt-5 pb-5'>
			<Container>
				<div className='new-prod-form'>
					<NewProductForm />
				</div>
			</Container>
		</div>
	)
}

export default NewProduct
