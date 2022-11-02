import axios from "axios";
import { userLoading, userCreated, userClosed, userMessage, userChanged } from "../reducers/UserSlice";
import AuthService from "../../services/AuthService";
import { API_URL } from "../api";
import history from "../../utils/history";

export const registration = (email, userName, password) => async (dispatch) => {
    try {
        dispatch(userLoading())
        const response = await AuthService.registration(userName, email, password)
        let data = response?.data
        localStorage.setItem('token', data?.accessToken)
        localStorage.setItem('refreshToken', response?.data?.refreshToken)

        dispatch(userCreated(data.user))
        alert(data.message)

        history.push('/')
        window.scrollTo(0, 0);
        window.location.reload()
    } catch (error) {
        let message = error.response.data.message
        alert(message)
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(userLoading())
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response?.data?.accessToken)
        localStorage.setItem('refreshToken', response?.data?.refreshToken)
        dispatch(userCreated(response?.data?.user))
        history.push('/')
        window.scrollTo(0, 0);
        window.location.reload()
    } catch (error) {
        let message = error.response.data.message
        alert(message)
    }
}

export const changeUserName = (email, userName) => async (dispatch) => {
    try {
        const response = await AuthService.changeUser({ email, userName })
        dispatch(userChanged(userName))
        alert(response?.data?.message)
    } catch (error) {
        let message = error.response.data.message
        alert(message)
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await AuthService.logout({ refreshToken: localStorage.getItem('refreshToken') })
        dispatch(userLoading())
        dispatch(userClosed())
        localStorage.removeItem('token')
        localStorage.removeItem('state')
        localStorage.removeItem('refreshToken')

        history.push('/')
        window.location.reload()
        window.scrollTo(0, 0);
    } catch (e) {
        alert(e.message)
    }
}

export const checkAuth = () => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/user/refresh`, { refreshToken: localStorage.getItem('refreshToken') })
        console.log(response)
        localStorage.setItem('token', response?.data?.accessToken)
        localStorage.setItem('refreshToken', response?.data?.refreshToken)
        dispatch(userLoading())
        dispatch(userCreated(response?.data?.user))
    } catch (error) {
        console.log(error.response)
    }
}