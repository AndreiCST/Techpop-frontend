import axios from 'axios'

class ValorationService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    saveValoration(product_id, user_id, reviewer_id, valorationData) {
        return this.api.put(`/valorations/create/${product_id}/${user_id}/${reviewer_id}`, valorationData)
    }
}

const valorationService = new ValorationService()

export default valorationService