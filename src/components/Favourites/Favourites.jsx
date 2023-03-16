import { Card, Col, Row, Tab, Tabs } from "react-bootstrap"
import ProductList from "../ProductList/ProductList"
import UserList from "../UsersList/UsersList"
import sellerImg from './../../assets/imagenes/favourites-users-placeholder.png'
import productImg from './../../assets/imagenes/favourite-products-placeholder.png'

import './Favourites.css'
import { useEffect, useState } from "react"

const Favourites = ({ products, sellers }) => {

    const activSellers = sellers.filter(elem => elem.activeUser === true)
    const activeProducts = products.filter(elem => elem.activeProduct === true)


    return (

        <Tabs
            defaultActiveKey="products"
            id="uncontrolled-tab-example"
            className="mb-3"
        >

            <Tab eventKey="products" title="Productos">

                {
                    activeProducts.length > 0

                        ?

                        <ProductList products={activeProducts} />

                        :

                        <Row className="m-2">
                            <Col sm={{ span: 6, offset: 3 }}>
                                <Card className="favouritesPlaceholder">

                                    <Card.Img src={productImg} />
                                    <Card.Text className="mt-5">Guarda los productos que te interesan</Card.Text>

                                </Card>
                            </Col>
                        </Row>

                }


            </Tab>

            <Tab eventKey="sellers" title="Vendedores">

                {
                    activSellers.length > 0

                        ?

                        <UserList sellers={activSellers} />

                        :

                        <Row className="m-2">
                            <Col sm={{ span: 6, offset: 3 }}>
                                <Card className="favouritesPlaceholder">

                                    <Card.Img src={sellerImg} />
                                    <Card.Text className="mt-5">Guarda los vendedores que te interesen</Card.Text>

                                </Card>
                            </Col>
                        </Row>

                }

            </Tab>

        </Tabs >

    )
}

export default Favourites