import { Col, Row } from "react-bootstrap"
import ProductCard from "../ProductCard/ProductCard"

import './ProductList.css'

const ProductList = ({ products }) => {

    return (
        <>
            <Row xs={1} sm={3} md={4} className='mb-5'>

                {/* {
                    searchedProducts

                        ?

                        {
                            searchedProducts?.map(elm => {
                                return (
                                    <Col key={elm._id} className='mt-3'>
                                        <ProductCard {...elm} />
                                    </Col>
                                )
                            })
                }
                : */}
                {
                    products?.map(elm => {
                        return (
                            <Col key={elm._id} className='mt-3'>
                                <ProductCard {...elm} />
                            </Col>
                        )
                    })
                }
                {/* } */}
            </Row >

        </>

    )
}

export default ProductList