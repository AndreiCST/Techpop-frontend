import './ProfilePage.css'
import userService from './../../services/user.services'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'

const ProfilePage = () => {

    const { user, logout, isLoading } = useContext(AuthContext)
    const [infoUser, setInfoUser] = useState([])

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {

        userService
            .getUser(user._id)
            .then(({ data }) => {
                setInfoUser(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <h1>Hello {infoUser.firstName}</h1>
    )
}

export default ProfilePage