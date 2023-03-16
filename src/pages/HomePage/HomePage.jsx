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
                const imagesArray = data.map(product => product.images)
                setProductsImg(imagesArray)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1 className='mt-5 pagePos'>Let´s buy Tech</h1>

            <Container md={{ span: 8, offset: 2 }}>
                <Carousel interval={5000}>
                    {
                        productsImg?.map((elm, index) => {
                            return (
                                <Carousel.Item key={index} style={{ width: '100%', height: '600px', backgroundColor: '#f5f5f5' }}>
                                    <img
                                        className="d-block w-100"
                                        src={`${elm}`}
                                        alt={`Slide ${index}`}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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