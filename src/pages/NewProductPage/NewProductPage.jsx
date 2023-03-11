import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NewProductForm from '../../components/NewProductForm/NewProductForm'

import './NewProductPage.css'

const NewProduct = () => {

    const navigate = useNavigate()

    return (

        <Container >
            <Row>
                <Col md={{ offset: 2, span: 8 }}>
                    <NewProductForm />
                </Col>
            </Row>
        </Container>
    )
}

export default NewProduct