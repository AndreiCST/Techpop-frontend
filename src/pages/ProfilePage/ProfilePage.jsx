import './ProfilePage.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Col, Container, ListGroup, Nav, Row, Tab } from 'react-bootstrap'
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
    const [isLoading, setIsLoading] = useState(true)
    const [isOwner, setIsOwner] = useState(true)

    // user_id !== user._id && setIsOwner(false)

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

    useEffect(() => {
        loadUser()
    }, [user_id])

    const loadUser = () => {

        userService
            .getUser(user_id)
            .then(({ data }) => {
                setInfoUser(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className='profile'>

            {
                isLoading

                    ?

                    <Loader />

                    :

                    <Tab.Container id="profile-sections" defaultActiveKey="first" >

                        <Row>

                            <Col sm={3}>

                                <ProfileHeader {...profilInfo} />

                                <Nav variant="pills" className="flex-column mt-1">

                                    <Nav.Item>
                                        <Nav.Link eventKey="sales">Ventas</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="purchases">Compras</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="favourites">Favoritos</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="conversations">Conversaciones</Nav.Link>
                                    </Nav.Item>

                                </Nav>

                            </Col>

                            <Col sm={9}>

                                <Tab.Content>

                                    <Tab.Pane eventKey="sales">
                                        <Sellings {...sellings} />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="purchases">
                                        <Purchases {...purchases} />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="favourites">
                                        <Favourites {...favourites} />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="conversations">
                                        <ConversationsList conversations={conversations} />
                                    </Tab.Pane>

                                </Tab.Content>

                            </Col>

                        </Row>

                    </Tab.Container>

            }

        </Container >
    )


}

export default ProfilePage