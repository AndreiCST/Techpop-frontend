import { Row, Col } from "react-bootstrap"
import UserCard from "../UserCard/UserCard"





const UserList = ({ sellers }) => {

    return (
        <>
            <Row xs={1} sm={3} md={4} className='mb-5'>
                {
                    sellers?.map(elm => {

                        return (
                            <Col key={elm._id} className='mt-3'>
                                <UserCard {...elm} />
                            </Col>
                        )
                    })
                }
            </Row >

        </>
    )
}

export default UserList