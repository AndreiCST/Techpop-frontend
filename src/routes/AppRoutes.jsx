import { Route, Router, Routes } from "react-router-dom"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import HomePage from '../pages/HomePage/HomePage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import PrivateRoute from "./PrivateRoute"
import NewProductPage from './../pages/NewProductPage/NewProductPage'
import ConversationPage from "../pages/ConversationPage/ConversationPage"
import ProductsListPage from "../pages/ProductsListPage/ProductsListPage"
import EditProductPage from "../pages/EditProductPage/EditProductPage"
import UserEditPage from '../pages/UserEditPage/UserEditPage'
import ProductRequests from "../pages/ProductRequests/ProductRequests"
import Valorations from "../components/Valorations/Valorations"
import ValorationFormPage from "../pages/ValorationPage/ValorationPage"

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile/:user_id" element={<ProfilePage />} />
                <Route path='/profile/new_product' element={<NewProductPage />} />
                <Route path='/profile/edit/:user_id' element={<UserEditPage />} />
                <Route path='/profile/conversations/:conversation_id' element={<ConversationPage />} />
                <Route path='/product/edit/:product_id' element={<EditProductPage />} />
                <Route path='/buy-requests/:product_id' element={<ProductRequests />} />
                <Route path="/valorations/:user_id" element={<Valorations />} />
                <Route path="/create-valoration/:product_id" element={<ValorationFormPage />} />
            </Route >
            <Route path="/search" element={<ProductsListPage />} />
            <Route path="/:product_id" element={<ProductDetailsPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<p>404</p>} />
        </Routes >

    )
}

export default AppRoutes