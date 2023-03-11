import './ConversationPage.css'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'
import Loader from './../../components/Loader/Loader'

const ConversationPage = () => {

    const [convInfo, setConvInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { conversation_id } = useParams()

    useEffect(() => {
        loadConvInfo()
    }, [])

    const loadConvInfo = () => {
        userService
            .getConversationMessages(conversation_id)
            .then(({ data }) => {
                setConvInfo(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {

                isLoading

                    ?

                    <Loader />

                    :

                    <div>
                        {
                            convInfo.messages.map((elem, index) => {
                                return <div className='aab' key={index}>{elem.message}</div>
                            })
                        }
                    </div>

            }
        </>
    )
}

export default ConversationPage