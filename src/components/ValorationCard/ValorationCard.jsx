import { Card } from "react-bootstrap"
import StarValoration from "../StarValoration/StarValoration"

const ValorationCard = ({ stars, description, product }) => {
    return (
        <Card>
            <StarValoration stars={stars} />
            <Card.Text className="mt-3">{description}</Card.Text>
        </Card>
    )
}

export default ValorationCard