import { useState } from "react"
import { Col, ListGroup, Row } from "react-bootstrap"
import ProductList from "../ProductList/ProductList"

const Sellings = ({ selling, sold }) => {

    const [currentSection, setcurrentSection] = useState('selling')

    const sectionsList = ['selling', 'sold']

    const handleInputSection = (component) => {
        setcurrentSection(component)
    }

    return (
        <>


            <ListGroup as="ul" className='mt-3'>

                {
                    sectionsList.map((elem, index) => {
                        return (
                            <Col key={index}>
                                <ListGroup.Item
                                    as="button"
                                    onClick={() => handleInputSection(elem)}
                                >
                                    {elem}
                                </ListGroup.Item>
                            </Col>

                        )
                    })
                }

            </ListGroup>

            {currentSection === 'selling' && <ProductList products={selling} />}
            {currentSection === 'sold' && <ProductList products={sold} />}
        </>
    )
}

export default Sellings