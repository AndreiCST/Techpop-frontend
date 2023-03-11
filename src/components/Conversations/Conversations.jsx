import ConversationCard from "../ConversationCard/ConversationCard"

const Conversations = ({ conversations }) => {

    return (
        <>
            {
                conversations.map((conversation, index) => {
                    return <ConversationCard key={index} {...{ conversation }} />
                })
            }
        </>
    )
}

export default Conversations