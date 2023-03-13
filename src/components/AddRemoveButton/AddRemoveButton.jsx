import { useState } from 'react'
import userService from '../../services/user.services'

import './AddRemoveButton.css'


const AddRemoveButton = ({ product_id, seller_id }) => {

    const [isfavouriteProducts, setIsFavouriteProducts] = useState(false)
    const [isfavouriteSellers, setIsFavouriteSellers] = useState(false)


    const toggleFavourite = (type, _id) => {

        if (type === 'product') {
            if (isfavouriteProducts) {
                userService
                    .removeFromFavProd(product_id)
                    .then(() => setIsFavouriteProducts(false))
                    .catch(error => console.log(error))
            } else {
                userService
                    .addToFavProd(product_id)
                    .then(() => setIsFavouriteProducts(true))
                    .catch(error => console.log(error))
            }

        } else if (type === 'seller') {
            if (isfavouriteSellers) {
                userService
                    .removeFromFavSel(seller_id)
                    .then(() => setIsFavouriteSellers(false))
                    .catch(error => console.log(error))
            } else {
                userService
                    .addToFavSel(seller_id)
                    .then(() => setIsFavouriteSellers(true))
                    .catch(error => console.log(error))
            }
        }
    }
}


export default AddRemoveButton