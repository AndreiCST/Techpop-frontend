import { AuthContext } from './../../contexts/auth.context'
import productsService from '../../services/product.services'
import { Container } from 'react-bootstrap'
import ProductsList from '../../components/ProductList/ProductList'
import { useState, useEffect, useContext } from 'react'
import Loader from './../../components/Loader/Loader'


import './ProductsListPage.css'


const ProductsListPage = () => {

    const [products, setProducts] = useState({})
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
                            <hr />
                            <ProductsList products={products} />
                        </>
                }
            </Container>
        </>
    )
}

export default ProductsListPage