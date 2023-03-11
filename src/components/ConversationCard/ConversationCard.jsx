import { useContext, useEffect, useState } from "react"
import { Card, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/user.services"


const ConversationCard = ({ conversation }) => {

    const [convInfo, setconvInfo] = useState({})
    const { user } = useContext(AuthContext)
    const participant = conversation.participants[0] !== user._id ? conversation.participants[0] : conversation.participants[1]
    console.log(convInfo)
    useEffect(() => {
        loadConvInfo()
    }, [])

    const loadConvInfo = () => {
        userService
            .getConvInfo(participant)
            .then(({ data }) => setconvInfo(data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Link>
                <Card>

                    <Card.Img style={{ height: '20px', width: '20px' }} variant="top" src={convInfo.avatar} />
                    <Card.Title>{convInfo.firstName} {convInfo.lastName}</Card.Title>

                </Card>
            </Link>
        </>
    )
}

export default ConversationCard