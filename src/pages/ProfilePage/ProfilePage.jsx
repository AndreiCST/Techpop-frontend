import './ProfilePage.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import userService from './../../services/user.services'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import Purchases from '../../components/Purchases/Purchases'
import Sellings from '../../components/Sellings/Sellings'
import Favourites from '../../components/Favourites/Favourites'
import Conversations from '../../components/Conversations/Conversations'
import Wallet from '../../components/Wallet/Wallet'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const { user_id } = useParams()
    const [infoUser, setInfoUser] = useState({})
    const [currentSection, setcurrentSection] = useState('Ventas')

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

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getUser(user_id)
            .then(({ data }) => {
                setInfoUser(data)
            })
            .catch(err => console.log(err))
    }

    const handleInputSection = (component) => {
        setcurrentSection(component)
    }

    return (
        <Container fluid>

            <Row className='mt-5'>
                <Col md={{ span: 9 }}>

                    {currentSection === 'Compras' && <Purchases {...{ purchases }} />}
                    {currentSection === 'Ventas' && <Sellings {...{ sellings }} />}
                    {currentSection === 'Favoritos' && <Favourites {...{ favourites }} />}
                    {currentSection === 'Conversaciones' && <Conversations />}
                    {currentSection === 'Cartera' && <Wallet />}

                </Col>

                <Col md={{ span: 2 }}>

                    <ProfileHeader {...{ profilInfo }} />

                    <ListGroup as="ul" className='mt-3'>

                        {
                            sectionsList.map((elem, index) => {
                                return (
                                    <Col key={index}>
                                        <ListGroup.Item
                                            as="button"
                                            onClick={() => handleInputSection(elem)}
                                        >
                                            {elem}
                                        </ListGroup.Item>
                                    </Col>

                                )
                            })
                        }

                    </ListGroup>

                </Col>
            </Row>


        </Container >
    )


}

export default ProfilePage