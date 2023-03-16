import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RequestCard from "../../components/RequestCard/RequestCard"
import productService from "../../services/product.services"

const ProductRequests = () => {
    const { product_id } = useParams()
    const [requests, setRequests] = useState([])

    useEffect(() => {
        requestsList()
    }, [])

    const requestsList = () => {

        productService
            .getOneProduct(product_id)
            .then(({ data }) => setRequests(data.buyRequest))
            .catch(err => console.log(err))
    }

    return (
        <>

            {
                requests?.map((elem, index) => {
                    return (
                        <RequestCard key={index} request={elem} />
                    )
                })
            }

        </>
    )
}

export default ProductRequests