import { useEffect, useState, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import ProductEditForm from '../../components/ProductEditForm/ProductEditForm'
import { AuthContext } from '../../contexts/auth.context'
import productService from '../../services/product.services'

import './UserEditPage.css'


const UserEditPage = () => {

    const [isLoading, setIsLoading] = useState(true)

    return (
        <></>
    )
}

export default UserEditPage