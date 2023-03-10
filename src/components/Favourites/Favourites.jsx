import { useState } from "react"
import { Col, ListGroup, Row } from "react-bootstrap"
import ProductList from "../ProductList/ProductList"

const Favourites = ({ favourites }) => {

    const { products, sellers } = favourites

    const [currentSection, setcurrentSection] = useState('products')

    const sectionsList = ['products', 'sellers']

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





            {currentSection === 'products' && <ProductList products={products} />}
            {currentSection === 'sellers' && <h1>hay que hacer la lista de usuarios</h1>}
        </>
    )
}

export default Favourites