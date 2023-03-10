import ProductCard from "../ProductCard/ProductCard"
import { Col, Row } from "react-bootstrap"

import './ProductList.css'

const ProductList = ({ products }) => {

    return (

        <Row>
            {
                products.map(elm => {
                    return (
                        <Col md={{ span: 3 }} key={elm._id}>
                            <ProductCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>

    )
}

export default ProductList