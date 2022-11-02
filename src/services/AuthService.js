import $api from "../store/api";

export default class AuthService {

    static async login(email, password) {
        return $api.post('/user/login', { email, password })
    }

    static async registration(userName, email, password) {
        return $api.post('/user/registration', { email, userName, password })
    }

    static sendForgotPassMail(data) {
        return $api.post('/user/send-forgot-email', data)
    }

    static forgotPassword(data) {
        return $api.put('/user/forgot-password', data)
    }

    static async changeUser(data) {
        return $api.put('/user/update', data)
    }

    static async logout(data) {
        return $api.post('/user/logout', data)
    }

    static async getUsers() {
        return $api.get('/user/users')
    }
}