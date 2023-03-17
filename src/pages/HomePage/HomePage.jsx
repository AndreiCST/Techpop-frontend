import { useState, useEffect } from 'react'
import { Container, Carousel } from 'react-bootstrap'
import productService from '../../services/product.services'


import './HomePage.css'

const HomePage = () => {

    const [products, setProducts] = useState([])
    const [productsImg, setProductsImg] = useState([])

    useEffect(() => {
        loadProducts()
    }, [])




    const loadProducts = () => {

        productService
            .getProducts()
            .then(({ data }) => {
                setProducts(data)
                const imagesArray = data?.map(product => product.images)
                console.log(imagesArray)
                setProductsImg(imagesArray)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1 className='mt-5 pagePos'>Let´s buy Tech</h1>

            <Container md={{ span: 6, offset: 3 }} style={{ margin: 'auto', textAlign: 'center', display: 'flex', justifyContent: 'center' }} className="mb-3">
                <Carousel interval={5000} wrap={true}>
                    {
                        productsImg?.map((elm, index) => {
                            return (
                                <Carousel.Item key={index} style={{ width: '100%', height: '650px', backgroundColor: '#f5f5f5' }}>
                                    <img
                                        className="d-block w-100"
                                        src={elm[0]}
                                        alt={`Slide ${index}`}
                                        style={{ objectFit: 'fit', width: '100%', height: '100%' }}
                                    />
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </Container>
        </>
    )
}

export default HomePage