import Apartments from "../pages/Apartments";
import Login from "../pages/sign-in/Login";
import Registration from "../pages/sign-in/Registration";
import Home from "../pages/Home";
import {
    APARTMENT_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PRICING_ROUTE,
    PROFILE_ROUTE,
    REG_ROUTE,
    BILLING_ROUTE,
    ADMIN_ROUTE,
    FORGOT_ROUTE,
    CONTACT_ROUTE
} from "./consts";
import Profile from "../pages/auth/Profile";
import Pricing from "../pages/Pricing";
import Billing from "../pages/auth/Billing";
import Admin from "../pages/Admin";
import ApartmentPage from "../pages/ApartmentPage";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/sign-in/ForgotPassword";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        component: Home
    },
    {
        path: APARTMENT_ROUTE,
        component: Apartments
    },
    {
        path: APARTMENT_ROUTE + '/:id',
        component: ApartmentPage
    },
    {
        path: PRICING_ROUTE,
        component: Pricing
    },
    {
        path: CONTACT_ROUTE,
        component: Contact
    },
    {
        path: LOGIN_ROUTE,
        component: Login
    },
    {
        path: REG_ROUTE,
        component: Registration
    },
    {
        path: FORGOT_ROUTE + '/:link',
        component: ForgotPassword
    }
]

export const authRoutes = [
    {
        path: HOME_ROUTE,
        component: Home
    },
    {
        path: APARTMENT_ROUTE,
        component: Apartments
    },
    {
        path: APARTMENT_ROUTE + '/:id',
        component: ApartmentPage
    },
    {
        path: PRICING_ROUTE,
        component: Pricing
    },
    {
        path: PROFILE_ROUTE,
        component: Profile
    },
    {
        path: BILLING_ROUTE,
        component: Billing
    },
    {
        path: CONTACT_ROUTE,
        component: Contact
    },
    {
        path: ADMIN_ROUTE,
        component: Admin
    }
]