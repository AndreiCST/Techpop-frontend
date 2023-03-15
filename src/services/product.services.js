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

    getSearchString(searchString) {
        return this.api.get(`/search/${searchString}`)
    }

    getOneProduct(product_id) {
        return this.api.get(`/${product_id}`)
    }

    saveProduct(productData, user_id) {
        return this.api.post(`/create-product/${user_id}`, productData)
    }

    updateProduct(product_id, productData) {
        return this.api.put(`/edit/${product_id}`, productData)
    }

    deleteProduct(product_id) {
        return this.api.put(`/delete/${product_id}`)
    }

}

const productService = new ProductsService()

export default productService