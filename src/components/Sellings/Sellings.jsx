import { useState } from "react"
import { Col, ListGroup, Row, Tab, Tabs } from "react-bootstrap"
import ProductList from "../ProductList/ProductList"

const Sellings = ({ selling, sold }) => {

    const activeSellings = selling.filter(elem => elem.activeProduct === true)
    const activeSold = sold.filter(elem => elem.activeProduct === true)

    return (
        <>
            <Tabs
                defaultActiveKey="selling"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="selling" title="En curso">
                    <ProductList products={activeSellings} />
                </Tab>
                <Tab eventKey="sold" title="Finalizadas">
                    <ProductList products={activeSold} />
                </Tab>
            </Tabs>

        </>
    )
}

export default Sellings