import axios from 'axios'

class UserService {

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

    getUser(user_id) {
        return this.api.get(`/profile/all-info/${user_id}`)
    }

    getConvInfo(user_id) {
        return this.api.get(`/profile/conv-info/${user_id}`)
    }

    getReducedInfoUser(user_id) {
        return this.api.get(`/profile/reduced-info/${user_id}`)
    }

    addMessage(convId, user, message) {
        return this.api.put(`/conversations/add-message/${convId}/${user}`, { message })
    }

    getConversationMessages(convId) {
        return this.api.get(`/conversations/conversation-messages/${convId}`)
    }

    getFavProd(user_id, product_id) {
        return this.api.get(`/favourites/is-favourite-product/${user_id}/${product_id}`)
    }

    addToFavProd(user_id, product_id) {
        return this.api.put(`/favourites/addToFavProd/${user_id}/${product_id}`)
    }

    removeFromFavProd(user_id, product_id) {
        return this.api.put(`/favourites/removeFromFavProd/${user_id}/${product_id}`)
    }

    getFavSel(user_id, seller_id) {
        return this.api.get(`/favourites/is-favourite-seller/${user_id}/${seller_id}`)
    }

    addToFavSel(user_id, seller_id) {
        return this.api.put(`/favourites/addToFavSel/${user_id}/${seller_id}`)
    }

    removeFromFavSel(user_id, seller_id) {
        return this.api.put(`/favourites/addToFavSel/${user_id}/${seller_id}`)
    }
}

const userService = new UserService()

export default userService