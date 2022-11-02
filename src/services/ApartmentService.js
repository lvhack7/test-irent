import $api from '../store/api'

export default class ApartmentService {
    static async create(data) {
        return $api.post('/apartment', data)
    }

    static async getAll() {
        return $api.get('/apartment/all')
    }

    static async findApt(id) {
        return $api.get('/apartment', { params: { id } })
    }

    static async getAllApartments(id) {
        return $api.get('/user/basket?', { params: { id } })
    }

    static async addApartment(data) {
        return $api.post('/user/basket', data)
    }

    static async removeApartment(data) {
        console.log(data)
        return $api.delete('/user/basket', { params: data })
    }
}