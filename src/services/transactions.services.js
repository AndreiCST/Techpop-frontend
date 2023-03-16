import axios from 'axios'

class TransactionsService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/transactions`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getTransaction(transaction_id) {
        return this.api.get(`/get-transaction/${transaction_id}`)
    }

    startTrans(product_id, buyer_id, seller_id) {
        return this.api.post(`/start/${product_id}/${buyer_id}/${seller_id}`)
    }

    rejectTrans(transaction_id) {
        return this.api.put(`/reject/${transaction_id}`)
    }

    acceptTrans(transaction_id, product_id, buyer_id, seller_id) {
        return this.api.put(`/accept/${transaction_id}/${product_id}/${buyer_id}/${seller_id}`)
    }

}

const transactionService = new TransactionsService()

export default transactionService