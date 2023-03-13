import './ProfilePage.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Col, Container, ListGroup, Nav, Row } from 'react-bootstrap'
import userService from './../../services/user.services'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import Purchases from '../../components/Purchases/Purchases'
import Sellings from '../../components/Sellings/Sellings'
import Favourites from '../../components/Favourites/Favourites'
import ConversationsList from '../../components/ConversationsList/ConversationsList'
import Wallet from '../../components/Wallet/Wallet'
import { useParams } from 'react-router-dom'
import Loader from './../../components/Loader/Loader'

const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const { user_id } = useParams()
    const [infoUser, setInfoUser] = useState({})
    const [currentSection, setcurrentSection] = useState('Ventas')
    const [isLoading, setIsLoading] = useState(true)

    const sectionsList = ['Compras', 'Ventas', 'Favoritos', 'Conversaciones', 'Cartera']

    const profilInfo = {
        firstName: infoUser.firstName,
        lastName: infoUser.lastName,
        valorations: infoUser.valorations?.allValorations,
        profilImage: infoUser.avatar
    }

    const favourites = {
        products: infoUser.favouriteProducts,
        sellers: infoUser.favouriteSellers
    }

    const sellings = {
        selling: infoUser.sellingProducts,
        sold: infoUser.soldProducts
    }

    const purchases = infoUser.purchasedProducts

    const conversations = infoUser.conversations

    const wallet = infoUser.wallet

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getUser(user_id)
            .then(({ data }) => {
                setInfoUser(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleInputSection = (component) => {
        setcurrentSection(component)
    }

    return (
        <Container className='aaa'>

            {
                isLoading

                    ?

                    <Loader />

                    :

                    <Row>

                        <Col md={{ span: 2 }}>

                            <ProfileHeader {...{ profilInfo }} />

                            <Nav className="flex-column mb-5 mt-5">

                                {
                                    sectionsList.map((elem, index) => {
                                        return (
                                            <Nav.Link
                                                key={index}
                                                as='button'
                                                onClick={() => handleInputSection(elem)}>
                                                {elem}
                                            </Nav.Link>
                                        )
                                    })
                                }

                            </Nav>


                        </Col>

                        <Col md={{ span: 8, offset: 2 }}>

                            {currentSection === 'Compras' && <Purchases {...{ purchases }} />}
                            {currentSection === 'Ventas' && <Sellings {...{ sellings }} />}
                            {currentSection === 'Favoritos' && <Favourites {...{ favourites }} />}
                            {currentSection === 'Conversaciones' && <ConversationsList {...{ conversations }} />}
                            {currentSection === 'Cartera' && <Wallet />}

                        </Col>

                    </Row>
            }

        </Container >
    )


}

export default ProfilePage