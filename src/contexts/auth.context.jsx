import { createContext, useEffect, useState } from "react"
import authService from './../services/auth.services'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const authenticateUser = () => {

        setIsLoading(true)

        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => logout())
        } else {
            logout()
        }
    }

    const refreshToken = () => {
        authService
            .updateToken()
            .then(({ data }) => {
                storeToken(data)
                authenticateUser()
            })
            .catch(err => console.log(err))
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
        setIsLoading(false)
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticateUser, user, logout, isLoading, refreshToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }