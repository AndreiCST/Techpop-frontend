import { Route, Routes } from "react-router-dom"
import HomePage from './../pages/HomePage'
import ProfilePage from './../pages/ProfilePage'
import SearchPage from './../pages/SearchPage'
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:category" element={<SearchPage />} />
            <Route path="/product/:product_id" element={<SearchPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes