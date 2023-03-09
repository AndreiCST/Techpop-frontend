import { Route, Routes } from "react-router-dom"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import HomePage from '../pages/HomePage/HomePage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import SearchPage from '../pages/SearchPage/SearchPage'
import SearchCategPage from '../pages/SearchCategPage/SearchCategPage'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import PrivateRoute from "./PrivateRoute"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:category" element={<SearchCategPage />} />
            <Route path="/:product_id" element={<ProductDetailsPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes