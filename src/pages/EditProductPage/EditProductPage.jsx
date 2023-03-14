import { useEffect, useState, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import ProductEditForm from '../../components/ProductEditForm/ProductEditForm'
import { AuthContext } from '../../contexts/auth.context'
import productService from '../../services/product.services'


import './EditProductPage.css'

const EditProductPage = () => {

    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { product_id } = useParams()
    const { user } = useContext(AuthContext)


    useEffect(() => {
        loadProduct()
    }, [])


    const loadProduct = () => {

        productService
            .getOneProduct(product_id)
            .then(({ data }) => {
                setProduct(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <Container>
            {
                isLoading
                    ?
                    <Loader />
                    :
                    <>
                        <h1>{product.name}</h1>
                        <hr />
                        <ProductEditForm product={product} />
                    </>
            }

        </Container>
    )
}

export default EditProductPage