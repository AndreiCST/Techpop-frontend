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
}

const productService = new ProductsService()

export default productService