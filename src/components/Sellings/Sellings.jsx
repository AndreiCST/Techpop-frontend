import { useState } from "react"
import { Col, ListGroup, Row, Tab, Tabs } from "react-bootstrap"
import ProductList from "../ProductList/ProductList"

const Sellings = ({ selling, sold }) => {

    return (
        <>
            <Tabs
                defaultActiveKey="selling"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="selling" title="En curso">
                    <ProductList products={selling} />
                </Tab>
                <Tab eventKey="sold" title="Finalizadas">
                    <ProductList products={sold} />
                </Tab>
            </Tabs>

        </>
    )
}

export default Sellings