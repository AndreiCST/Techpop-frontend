import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import userService from "../../services/user.services"
import ValorationCard from "../ValorationCard/ValorationCard"

const Valorations = () => {
    const { user_id } = useParams()
    const [valorations, setValorations] = useState([])

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getUser(user_id)
            .then(({ data }) => setValorations(data?.valorations?.allValorations))
            .catch(err => console.log(err))
    }

    return (

        <Row>

            {
                valorations.map((elem, index) => {
                    return (
                        <Col md={{ span: 8, offset: 2 }}>
                            <ValorationCard {...elem} />
                        </Col>
                    )

                })
            }

        </Row>

    )

}

export default Valorations