import { useState } from 'react'
import FormError from '../FormError/FormError'

import './NewProductForm.css'

const NewProductForm = ({ fireFinalActions }) => {

    const [errors, setErrors] = useState([])

    return (
        <>

            <h2>New Product Form</h2>

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

        </>
    )

}

export default NewProductForm