import './ProfilePage.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../contexts/auth.context'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import userService from './../../services/user.services'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import Purchases from '../../components/Purchases/Purchases'
import Sellings from '../../components/Sellings/Sellings'
import Favorits from '../../components/Favorits/Favorits'
import Conversations from '../../components/Conversations/Conversations'
import Wallet from '../../components/Wallet/Wallet'

const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const [infoUser, setInfoUser] = useState({})
    const [currentSection, setcurrentSection] = useState('Ventas')

    const sectionsList = ['Compras', 'Ventas', 'Favoritos', 'Conversaciones', 'Cartera']

    const profilInfo = {
        firstName: infoUser.firstName,
        lastName: infoUser.lastName,
        valorations: infoUser.valorations?.avgValoration,
        profilImage: infoUser.avatar
    }

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

    const handleInputSection = (component) => {
        setcurrentSection(component)
    }

    return (
        <Container fluid>

            <Row className='mt-5'>
                <Col md={{ span: 9 }}>

                    {currentSection === 'Compras' && <Purchases />}
                    {currentSection === 'Ventas' && <Sellings />}
                    {currentSection === 'Favoritos' && <Favorits />}
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