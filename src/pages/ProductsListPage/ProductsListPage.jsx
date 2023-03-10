import { AuthContext } from './../../contexts/auth.context'
import productsService from '../../services/product.services'
import { Container, Modal, Button } from 'react-bootstrap'
import ProductsList from '../../components/ProductList/ProductList'
import NewProductForm from './../../components/NewProductForm/NewProductForm'
import { useState, useEffect, useContext } from 'react'
import Loader from './../../components/Loader/Loader'


import './ProductsListPage.css'


const ProductsListPage = () => {

    const [products, setProducts] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {

        productsService
            .getProducts()
            .then(({ data }) => {
                setProducts(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        setShowModal(false)
        loadProducts()
    }


    return (
        <>
            <Container>
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <>
                            <h1>Listado de Productos</h1>
                            {user && <Button onClick={() => setShowModal(true)} variant="dark" size='sm'>Crear producto</Button>}
                            <hr />
                            <ProductsList products={products} />
                        </>
                }
            </Container>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title>New Product</Modal.Title></Modal.Header>
                <Modal.Body>
                    <NewProductForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

        </>

    )
}

export default ProductsListPage