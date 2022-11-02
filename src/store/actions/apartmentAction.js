import ApartmentService from "../../services/ApartmentService"
import { userBasketRemove, userBasketAdd } from "../reducers/UserSlice"

export const createApartment = (files, data) => async (dispatch) => {
    try {
        let formData = new FormData()
        console.log(data)
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }
        formData.append('data', data)

        const response = await ApartmentService.create(formData)
        console.log(response)
    } catch (e) {
        console.log(e.response.data.message)
    }
}

export const removeBasketApartment = (userId, aptId) => async (dispatch) => {
    try {
        const response = await ApartmentService.removeApartment({ userId, aptId })
        dispatch(userBasketRemove(aptId))
        alert(response?.data?.message)
        window.location.reload()
    } catch (e) {
        console.log(e.response.data.message)
    }
}

export const addBasketApartment = (userId, aptId) => async (dispatch) => {
    try {
        const response = await ApartmentService.addApartment({ userId, aptId })
        dispatch(userBasketAdd(aptId))
        alert(response.data.message)
        window.location.reload()
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}