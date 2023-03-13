import { useContext } from "react"
import { Card } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"

const ChatMessages = ({ elem }) => {

    const { user } = useContext(AuthContext)

    let styleMsg = {
        textAlign: 'end'
    }

    if (elem.sender !== user._id) styleMsg.textAlign = 'start'

    return (
        < Card as='ul' >
            <Card.Body style={styleMsg}>{elem.message}</Card.Body>
        </Card >
    )
}

export default ChatMessages