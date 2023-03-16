import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button, Carousel, ListGroup } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import StarValoration from "../../components/StarValoration/StarValoration"
import userService from "../../services/user.services"
import productService from "../../services/product.services"
import './ProductDetailsPage.css'


const ProductPage = () => {

    const { product_id } = useParams()
    const { user } = useContext(AuthContext)

    const [product, setProduct] = useState([])
    const [productOwner, setProductOwner] = useState({})
    const [isFavouriteProducts, setIsFavouriteProducts] = useState({})
    const [isOwner, setIsOwner] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        productService
            .getOneProduct(product_id)
            .then(({ data }) => {
                setProduct(data)
                setProductOwner(data.owner)
                if (user) {
                    isFavProduct()
                }
                if (data?.owner?._id === user?._id) {
                    setIsOwner(true)
                }

            })
            .catch(err => console.log(err))
    }

    const isFavProduct = () => {

        userService
            .getFavProd(user._id, product_id)
            .then(data => {
                setIsFavouriteProducts(data.data)
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

    const handleConversation = () => {

        userService
            .verifyConv(user._id, productOwner._id, product._id)
            .then(({ data }) => {

                if (data !== 'false') {
                    navigate(`/profile/conversations/${data}`)
                } else {
                    userService.createConv(user._id, productOwner._id, product._id)
                    navigate(`/profile/${user._id}`)
                }
            })
            .catch(err => console.log(err))
    }

    const handleEditClick = () => { navigate(`/product/edit/${product_id}`) }

    const handleDeleteClick = () => {

        productService
            .deleteProduct(product_id)
            .then(() => navigate(`/profile/${user._id}`))
            .catch(err => console.log(err))
    }

    const handlePurchase = () => {

    }

    return (

        <Container className="pt-5">

            <Row>

                <Col md={10}>
                    <h1 className="mb-4">{product.name}</h1>
                </Col>


                {
                    isOwner

                        ?

                        <Col md={2}>

                            <Link to={`/buy-requests/${product_id}`}>Solicitudes de compra</Link>

                        </Col>

                        :

                        <h1></h1>
                }

            </Row>



            <hr />

            <Row>

                <Col md={{ span: 4 }}>
                    <Carousel>

                        {
                            product?.images?.map((elm, index) => {
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
                            <Link to={`/profile/${productOwner._id}`}>{productOwner.firstName} {productOwner.lastName}</Link>
                            <StarValoration stars={productOwner.valorations?.avgValoration} />
                        </ListGroup.Item>
                        <ListGroup.Item>State: {product.stateOfProduct}</ListGroup.Item>
                    </ListGroup>

                    <hr />

                    {
                        !isOwner

                            ?

                            <>
                                <Button onClick={handleConversation} className="ms-3">Chat</Button>
                                <Button onClick={handlePurchase} className="ms-3">Comprar</Button>
                            </>

                            :

                            <h1></h1>
                    }

                    <Button onClick={handleFavClick} variant="secondary">{isFavouriteProducts ? 'Eliminar de favoritos' : 'Agregar a favoritos'}</Button>

                    {
                        isOwner

                            ?

                            <Row>
                                <Col>
                                    <Button onClick={handleEditClick} className='mt-2' variant="warning">Editar Producto</Button>
                                </Col>
                                <Col>
                                    <Button onClick={handleDeleteClick} className='mt-2' variant="danger">Eliminar Producto</Button>
                                </Col>
                            </Row>

                            :

                            <h1></h1>
                    }

                </Col >

                <hr />

                <Link to="/search">
                    <Button as="figure" variant="dark">Volver a la lista</Button>
                </Link>

            </Row >

        </Container >
    )
}

export default ProductPage