import { AuthContext } from './../../contexts/auth.context'
import productService from '../../services/product.services'
import { Container, Form, Button } from 'react-bootstrap'
import ProductsList from '../../components/ProductList/ProductList'
import { useState, useEffect, useContext } from 'react'
import Loader from './../../components/Loader/Loader'


import './ProductsListPage.css'


const ProductsListPage = () => {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchString, setSearchString] = useState('')
    const [productsLength, setProductsLength] = useState(0)
    const [empySearch, setEmpySearch] = useState(true)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadProducts()
    }, [])

    useEffect(() => {
        setEmpySearch(products.length !== productsLength)
    }, [products])

    const loadProducts = () => {

        productService
            .getProducts()
            .then(({ data }) => {
                setProductsLength(data.length)
                setProducts(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleSearch = e => {

        e.preventDefault()

        if (!searchString) {
            setSearchString('')
            return
        } else {
            setSearchString(e.target.value)
            productService
                .getSearchString(searchString)
                .then(({ data }) => setProducts(data))
                .catch(err => console.log(err))
        }
    }


    return (

        <div className='pagePos'>

            <Form className="d-flex mt-5" onSubmit={handleSearch}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 ms-5 mb-5"
                    aria-label="Search"
                    value={searchString ? searchString : ''}
                    onChange={e => setSearchString(e.target.value)}
                />
                <Button type="submit" className="me-5 mb-5" variant="dark">Search</Button>
            </Form>

            {
                isLoading
                    ?
                    <Loader />
                    :

                    <Container>
                        <h1>Lista de Productos</h1>
                        <hr />
                        <ProductsList products={products} />
                    </Container>

            }

            {
                empySearch
                    ?
                    <Button onClick={loadProducts} variant="dark">Volver a la lista</Button>
                    :
                    <></>
            }
        </div>
    )
}

export default ProductsListPage