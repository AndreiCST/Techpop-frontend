import { Tab, Tabs } from "react-bootstrap"
import ProductList from "../ProductList/ProductList"
import UserList from "../UsersList/UsersList"

const Favourites = ({ products, sellers }) => {

    return (

        <Tabs
            defaultActiveKey="products"
            id="uncontrolled-tab-example"
            className="mb-3"
        >

            <Tab eventKey="products" title="Productos">
                <ProductList products={products} />
            </Tab>

            <Tab eventKey="selelrs" title="Vendedores">
                <UserList sellers={sellers} />
            </Tab>

        </Tabs>

    )
}

export default Favourites