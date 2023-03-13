import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button, Carousel, ListGroup } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/user.services"
import productService from "../../services/product.services"

import './ProductDetailsPage.css'



const ProductPage = () => {

    const { product_id } = useParams()
    const { user } = useContext(AuthContext)

    const [product, setProduct] = useState([])
    const [productOwner, setProductOwner] = useState({})
    const [isFavouriteProducts, setIsFavouriteProducts] = useState({})


    useEffect(() => {
        productService
            .getOneProduct(product_id)
            .then(({ data }) => {
                setProduct(data)
                setProductOwner(data.owner)
                if (user) {
                    isFavProduct()
                }
            })
            .catch(err => console.log(err))
    }, [])


    const isFavProduct = () => {

        userService
            .getFavProd(user._id, product_id)
            .then(data => {
                setIsFavouriteProducts(data.data)
                console.log(data.data)
            })
            .catch(err => console.log(err))
    }


    const handleFavClick = () => {
        if (isFavouriteProducts) {
            userService
                .removeFromFavProd(user._id, product_id)
                .then(() => {
                    setIsFavouriteProducts(false)
                })
                .catch(err => console.log(err))
        } else {
            userService
                .addToFavProd(user._id, product_id)
                .then(() => {
                    setIsFavouriteProducts(true)
                })
                .catch(err => console.log(err))
        }
    }


    return (

        <Container className="productDetailsPage">

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

                <Col md={{ span: 6, offset: 1 }} className="mb-4">
                    <h3>Descripcion:</h3>
                    <p>{product.description}</p>
                    <ListGroup>
                        <ListGroup.Item>Precio: {product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Owner: <Link to={`/profile/${productOwner._id}`}>{productOwner.firstName} {productOwner.lastName}</Link> |
                            Valoration Avg: {productOwner.valorations?.avgValoration}
                        </ListGroup.Item>
                        <ListGroup.Item>State: {product.stateOfProduct}</ListGroup.Item>
                    </ListGroup>

                    <hr />

                    <Button onClick={handleFavClick}>{isFavouriteProducts ? 'Eliminar de favoritos' : 'Agregar a favoritos'}</Button>

                </Col>

                <hr />

                <Link to="/">
                    <Button as="figure" variant="dark">Volver a la lista</Button>
                </Link>

            </Row>

        </Container >
    )
}

export default ProductPage