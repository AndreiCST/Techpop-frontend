import { useEffect, useState } from "react"
import transactionService from "../../services/transactions.services"

const RequestCard = ({ request }) => {


    const [infoRequest, setInfoRequest] = useState({})


    useEffect(() => {
        loadInfoTransaction()
    }, [request])

    const loadInfoTransaction = () => {

        transactionService
            .getTransaction(request)
            .then(({ data }) => setInfoRequest(data))
            .catch(err => console.log(err))
    }




    return (
        <h1>{infoRequest.buyer?.firstName}</h1>
    )
}

export default RequestCard