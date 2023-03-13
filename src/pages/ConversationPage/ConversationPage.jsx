import './ConversationPage.css'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'
import Loader from './../../components/Loader/Loader'
import { Form, Button, Card, Col, Container, Row } from 'react-bootstrap'
import ChatMessages from './../../components/ChatMessages/ChatMessages'

const ConversationPage = () => {

    const { user } = useContext(AuthContext)
    const [convInfo, setConvInfo] = useState([])
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { conversation_id } = useParams()

    useEffect(() => {
        loadConvInfo()
    }, [convInfo])

    const loadConvInfo = () => {
        userService
            .getConversationMessages(conversation_id)
            .then(({ data }) => {
                setConvInfo(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (message.trim() !== '') {
            return userService
                .addMessage(conversation_id, user._id, message)
                .then(() => {
                    console.log("entrooo???")
                    setMessage('')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>

            {

                isLoading

                    ?

                    <Loader />

                    :

                    <Container>

                        <Row className='chat' >

                            <Col md={{ span: 9, offset: 1 }} className='messages'>
                                {
                                    convInfo.messages.map((elem, index) => {
                                        return <ChatMessages key={elem._id} {...{ elem }} />
                                    })
                                }
                            </Col>

                            <Col md={{ span: 9, offset: 1 }}>

                                <Form onSubmit={handleSubmit}>

                                    <Row className='align-items-center'>

                                        <Col md={{ span: 11 }}>

                                            <Form.Control as="textarea" value={message} onChange={(e) => setMessage(e.target.value)} />

                                        </Col>

                                        <Col md={{ span: 1 }}>

                                            <Button variant="primary" type="submit">
                                                Enviar
                                            </Button>

                                        </Col>

                                    </Row>

                                </Form>

                            </Col>

                        </Row>

                    </Container>

            }

        </>
    )
}

export default ConversationPage