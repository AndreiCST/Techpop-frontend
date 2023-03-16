import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import emptyStar from './../../assets/imagenes/star-icon-1.png'
import fullStar from './../../assets/imagenes/star-icon-2.png'
import './StarValoration.css'

const StarValoration = ({ stars }) => {

    let starsArray = []

    const createStars = () => {

        [...Array(Math.floor(stars)).keys()].forEach(() => starsArray.push(fullStar))

        while (starsArray.length < 5) { starsArray.push(emptyStar) }

    }

    createStars()

    return (

        <>
            <div sm={{ span: 6, offset: 3 }}>

                {
                    starsArray.map((elem, index) => {
                        return <img key={index} className='starImg' src={elem} alt="stars" />
                    })
                }

            </div>

        </>

    )
}

export default StarValoration