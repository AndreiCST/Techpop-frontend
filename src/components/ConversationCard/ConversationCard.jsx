import { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/user.services"
import './ConversationCard.css'


const ConversationCard = ({ _id, participants }) => {

    const [convInfo, setconvInfo] = useState({})
    const { user } = useContext(AuthContext)
    const participant = participants[0] !== user._id ? participants[0] : participants[1]

    useEffect(() => {
        loadConvInfo()
    }, [])

    const loadConvInfo = () => {
        userService
            .getConvInfo(participant)
            .then(({ data }) => setconvInfo(data))
            .catch(err => console.log(err))
    }

    const handle = () => {
        userService
            .deleteConv(user._id, _id)
            .catch(err => console.log(err))
    }

    return (
        <>

            <Card className="d-flex h-100 mt-2">

                <Row>

                    <Col sm={10}>
                        <Link to={`/profile/conversations/${_id}`} >

                            <Row className="align-items-center p-2">

                                <Col>

                                    <Card.Img className="rounded-circle convCardImg" variant="left" src={convInfo.avatar} />

                                </Col>

                                <Col>

                                    <Card.Title>{convInfo.firstName} {convInfo.lastName}</Card.Title>

                                </Col>

                            </Row>

                        </Link>
                    </Col>


                    <Col className="d-flex align-items-center" sm={2}>
                        <Button onClick={handle}>Borrar</Button>
                    </Col>


                </Row>

            </Card>
        </>
    )
}

export default ConversationCard