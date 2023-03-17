import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import valorationService from "../../services/valoration.services"
import StarValoration from "../StarValoration/StarValoration"

const ValorationCard = ({ valoration }) => {

    const [valorationInfo, setValorationInfo] = useState()

    useEffect(() => {
        loadValoration()
    }, [])


    const loadValoration = () => {

        valorationService
            .getValorationInfo(valoration)
            .then(({ data }) => setValorationInfo(data))
            .catch(err => console.log(err))
    }

    return (
        <Card className="p-2">
            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <StarValoration stars={valorationInfo?.stars} />

                </Col>

                <Col md={{ span: 8, offset: 2 }}>

                    <Card.Text className="mt-3">{valorationInfo?.description}</Card.Text>

                </Col>

            </Row>
        </Card >
    )
}

export default ValorationCard