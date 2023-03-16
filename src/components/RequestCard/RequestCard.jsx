import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import transactionService from "../../services/transactions.services"
import ProductCard from "../ProductCard/ProductCard"
import './RequestCard.css'

const RequestCard = ({ _id, buyer, seller, product }) => {
    console.log(seller)
    const handleBtnSell = () => {
        transactionService
            .acceptTrans(_id, product._id, buyer._id, seller)
            .then(() => console.log('solicitud rechazada'))
            .catch(err => console.log(err))
    }

    return (
        <Card className="borderNone">
            <Row className="align-items-center mt-5">

                <Col md={{ span: 4, offset: 1 }}>
                    <ProductCard {...product} />
                </Col>

                <Col>
                    <Card.Title className="mb-5">{buyer?.firstName} {buyer?.lastName} quiere comprar tu producto</Card.Title>
                    <Button onClick={handleBtnSell}>Aceptar</Button>
                    <Button className="ms-5">Rechazar</Button>
                </Col>

            </Row>
        </Card>
    )
}

export default RequestCard