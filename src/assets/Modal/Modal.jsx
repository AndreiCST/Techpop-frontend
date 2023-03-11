import { Container, Modal, Button } from 'react-bootstrap'
import NewProductForm from './../../components/NewProductForm/NewProductForm'
import { useState, useEffect, useContext } from 'react'

import ExperimentalNewProduct from '../../components/ExperimentalNewProduct/ExperimentalNewProduct'


const modalExperiment = () => {

    const [showModal, setShowModal] = useState(false)

    const fireFinalActions = () => {
        setShowModal(false)
        loadProducts()
    }

    return (
        <>
            <Container>
                <h1>Listado de Productos</h1>
                {user && <Button onClick={() => setShowModal(true)} variant="dark" size='sm'>Crear producto</Button>}
                <hr />
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title>New Product</Modal.Title></Modal.Header>
                <Modal.Body>
                    <ExperimentalNewProduct fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )

}