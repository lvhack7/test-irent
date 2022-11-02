import $api from "../store/api"

export default class CheckoutService {
    static async checkout(data) {
        return $api.post('/checkout', data)
    }

    static async passApartment(data) {
        return $api.post('/checkout/pass', data)
    }

    static async findAllCheckedApts(userId) {
        return $api.get('/checkout', { params: { userId } })
    }

    static async findAll() {
        return $api.get('/checkout/all')
    }
}