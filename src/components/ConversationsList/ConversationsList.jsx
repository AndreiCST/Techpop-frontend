import { Row } from "react-bootstrap"
import ConversationCard from "../ConversationCard/ConversationCard"

const ConversationsList = ({ conversations }) => {

    return (

        <Row className="ps-5 pe-5">

            {
                conversations.map((conversation, index) => {
                    return <ConversationCard key={index} {...conversation} />
                })
            }

        </Row>

    )
}

export default ConversationsList