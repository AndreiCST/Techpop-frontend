import axios from 'axios'

class ProductsService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/products`
        })
    }

    getProducts() {
        return this.api.get('/get-products')
    }

    getOneProduct(product_id) {
        return this.api.get(`/${product_id}`)
    }

    saveProduct(productData, user_id) {
        return this.api.post(`/create-product/${user_id}`, productData)
    }

    addToFav(product_id, user_id) {
        return this.api.put(`/addToFav/${product_id}`, { user_id })
    }
}

const productService = new ProductsService()

export default productService