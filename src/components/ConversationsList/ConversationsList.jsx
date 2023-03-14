import { Row } from "react-bootstrap"
import ConversationCard from "../ConversationCard/ConversationCard"

const ConversationsList = ({ conversations }) => {

    return (

        <Row>

            {
                conversations.map((conversation, index) => {
                    return <ConversationCard key={index} {...conversation} />
                })
            }

        </Row>

    )
}

export default ConversationsList