import ConversationCard from "../ConversationCard/ConversationCard"

const ConversationsList = ({ conversations }) => {

    return (
        conversations.map((conversation, index) => {
            return <ConversationCard key={index} {...conversation} />
        })
    )
}

export default ConversationsList