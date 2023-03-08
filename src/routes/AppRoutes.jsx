import { Route, Routes } from "react-router-dom"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import HomePage from '../pages/HomePage/HomePage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import SearchPage from '../pages/SearchPage/SearchPage'
import SearchCategPage from '../pages/SearchCategPage/SearchCategPage'
import ProductPage from '../pages/ProductPage/ProductPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:category" element={<SearchCategPage />} />
            <Route path="/product/:product_id" element={<ProductPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes