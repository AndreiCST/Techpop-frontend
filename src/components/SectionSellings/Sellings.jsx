import { useState } from 'react'
import { Card, Col, ListGroup, Row, Tab, Tabs } from 'react-bootstrap'
import ProductList from '../ListProduct/ListProduct'
import productImg from './../../assets/imagenes/placeholderSelling.png'

const Sellings = ({ selling, sold }) => {
	const activeSellings = selling.filter((elem) => elem.activeProduct === true)
	const activeSold = sold.filter((elem) => elem.activeProduct === true)

	return (
		<>
			<Tabs defaultActiveKey='selling' id='uncontrolled-tab-example' className='mb-3'>
				<Tab eventKey='selling' title='En curso'>
					{activeSellings.length > 0 ? (
						<ProductList products={activeSellings} />
					) : (
						<Row className='m-2'>
							<Col sm={{ span: 6, offset: 5 }}>
								<Card className='favouritesPlaceholder'>
									<Card.Img src={productImg} />
									<Card.Text className='mt-5'>
										Aqui apareceran los productos que tienes en venta
									</Card.Text>
								</Card>
							</Col>
						</Row>
					)}
				</Tab>
				<Tab eventKey='sold' title='Finalizadas'>
					{activeSold.length > 0 ? (
						<ProductList products={activeSold} />
					) : (
						<Row className='m-2'>
							<Col sm={{ span: 6, offset: 5 }}>
								<Card className='favouritesPlaceholder'>
									<Card.Img src={productImg} />
									<Card.Text className='mt-5'>
										Aqui apareceran los productos que hayas vendido
									</Card.Text>
								</Card>
							</Col>
						</Row>
					)}
				</Tab>
			</Tabs>
		</>
	)
}

export default Sellings
