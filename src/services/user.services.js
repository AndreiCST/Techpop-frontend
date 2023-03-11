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

    addMessage(convId, user) {
        return this.api.put(`/conversations/add-message/${convId}/${user}`)
    }

    getConversationMessages(convId) {
        return this.api.get(`/conversations/conversation-messages/${convId}`)
    }
}

const userService = new UserService()

export default userService