import './ProfilePage.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Button, Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import userService from './../../services/user.services'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import Purchases from '../../components/Purchases/Purchases'
import Sellings from '../../components/Sellings/Sellings'
import Favourites from '../../components/Favourites/Favourites'
import ConversationsList from '../../components/ConversationsList/ConversationsList'
import Wallet from '../../components/Wallet/Wallet'
import { Link, useParams } from 'react-router-dom'
import Loader from './../../components/Loader/Loader'

const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const { user_id } = useParams()
    const [infoUser, setInfoUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isCurrentUser, setIsCurrentUser] = useState()
    const [isFavouriteSeller, setISFavouriteSeller] = useState()
    const [key, setKey] = useState('sales')
    const [animation, setAnimation] = useState('mt-2 button-67 profileNavBut')
    const { logout } = useContext(AuthContext)

    const profilInfo = {
        firstName: infoUser.firstName,
        lastName: infoUser.lastName,
        averageValoration: infoUser.valorations?.avgValoration,
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
        isFavSeller()
        setKey('sales')
    }, [user_id, isCurrentUser])

    const loadUser = () => {

        userService
            .getUser(user_id)
            .then(({ data }) => {
                setInfoUser(data)
                setIsLoading(false)
                if (user_id !== user._id) setIsCurrentUser(false)
                if (user_id === user._id) setIsCurrentUser(true)
            })
            .catch(err => console.log(err))
    }

    const isFavSeller = () => {

        userService
            .getFavSel(user._id, user_id)
            .then(({ data }) => {
                setISFavouriteSeller(data)
            })
            .catch(err => console.log(err))
    }

    const handleFavClick = () => {
        if (isFavouriteSeller) {
            userService
                .removeFromFavSel(user._id, user_id)
                .then(() => {
                    setISFavouriteSeller(false)
                })
                .catch(err => console.log(err))
        } else {
            userService
                .addToFavSel(user._id, user_id)
                .then(() => {
                    setISFavouriteSeller(true)
                })
                .catch(err => console.log(err))
        }
    }

    const handleBtnAnimation = () => {


        setAnimation('mt-2 button-67 float profileNavBut')

        setTimeout(() => {
            setAnimation('mt-2 button-67 profileNavBut')
        }, 100);
    }

    const handleDeleteButton = () => {

        logout()

        userService
            .deleteUser(infoUser._id)
            .then(() => console.log('el usuario se ha borrado'))
            .catch(err => console.log(err))
    }

    return (
        <Container>

            {
                isLoading

                    ?

                    <Loader />

                    :

                    <Tab.Container id="profile-sections" activeKey={key}>

                        <Row className='h-100'>

                            <Col md={3} className='navColumn pb-4'>

                                <ProfileCard {...profilInfo} />

                                <Nav className="flex-column mt-1">

                                    <Nav.Item>
                                        <Nav.Link eventKey="sales" className={animation} onClick={() => setKey('sales')}>Ventas</Nav.Link>
                                    </Nav.Item>

                                    {
                                        isCurrentUser

                                            ?

                                            <div>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="purchases" className={animation} onClick={() => setKey('purchases')}>Compras</Nav.Link>
                                                </Nav.Item>

                                                <Nav.Item>
                                                    <Nav.Link eventKey="favourites" className={animation} onClick={() => setKey('favourites')}>Favoritos</Nav.Link>
                                                </Nav.Item>

                                                <Nav.Item>
                                                    <Nav.Link eventKey="conversations" className={animation} onClick={() => setKey('conversations')}>Conversaciones</Nav.Link>
                                                </Nav.Item>

                                                <Nav.Item>
                                                    <Link to={`/profile/edit/${user_id}`} className='notDecoration mt-2 button-67 profileNavBut'>
                                                        Editar Perfil
                                                    </Link>
                                                </Nav.Item>

                                                <Nav.Item>
                                                    <Nav.Link className={animation} onClick={handleDeleteButton}>Eliminar perfil</Nav.Link>
                                                </Nav.Item>
                                            </div>


                                            :

                                            <h1></h1>

                                    }

                                </Nav>

                            </Col>

                            <Col md={9} >

                                <Row className='sectionColumn pt-2'>

                                    {

                                        isCurrentUser

                                            ?

                                            <>

                                                <Col md={12} className='d-flex justify-content-end'>

                                                    <Link to={`/profile/new_product`} className='notDecoration'>
                                                        <Button className='button-88 float'>+ Añadir producto</Button>
                                                    </Link>

                                                </Col>

                                                <hr className='mt-3' />

                                            </>

                                            :

                                            <>

                                                <Col md={12} className='d-flex justify-content-end'>

                                                    <Button
                                                        onClick={handleFavClick}
                                                        className='button-88 transLeft'
                                                    >{isFavouriteSeller ? 'quitar' : 'añadir'}</Button>

                                                </Col>

                                                <hr className='mt-3' />

                                            </>

                                    }

                                    <Col md={12} className='pt-3'>

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

                            </Col>

                        </Row >

                    </Tab.Container >

            }

        </Container >
    )


}

export default ProfilePage