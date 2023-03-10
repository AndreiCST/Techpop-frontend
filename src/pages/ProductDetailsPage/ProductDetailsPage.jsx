import { useEffect, useState } from "react"
import { Container, Row, Col, Button, Carousel } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import productService from "../../services/product.services"
import userService from "../../services/user.services"

import './ProductDetailsPage.css'


const ProductPage = () => {

    const [product, setProduct] = useState({})
    const [productOwner, setProductOwner] = useState({})

    const { product_id } = useParams()

    useEffect(() => {
        productService
            .getOneProduct(product_id)
            .then(({ data }) => setProduct(data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (product.owner) {
            userService
                .getUser(product.owner)
                .then(({ data }) => {
                    setProductOwner(data);
                })
                .catch(err => console.log(err))
        }
    }, [product.owner])

    return (

        <Container>

            <h1 className="mb-4">Detalles de {product.name}</h1>
            <hr />

            <Row>

                <Col md={{ span: 4 }}>
                    <Carousel>

                        {
                            product.images && product.images.map((elm, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={elm}
                                            alt={`Slide ${elm._id}`}
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </Col>


                <Col md={{ span: 6, offset: 1 }}>
                    <h3>Descripcion:</h3>
                    <p>{product.description}</p>
                    <ul>
                        <li>Precio: {product.price}</li>
                        <li>{productOwner.firstName}{productOwner.lastName}</li>
                        <li>{product.stateOfProduct}</li>
                    </ul>
                    <hr />

                    <Link to="/">
                        <Button as="figure" variant="dark">Volver a la lista</Button>
                    </Link>
                </Col>

            </Row>

        </Container >
    )
}

export default ProductPage