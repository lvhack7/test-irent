import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    user: {},
    message: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        hydrate: (state, action) => {
            return action.payload
        },

        userLoading: (state) => {
            state.isLoading = true
        },

        userCreated: (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            state.error = ''
            state.user = action.payload
        },

        userChanged: (state, action) => {
            state.user.userName = action.payload
        },

        userBasketRemove: (state, action) => {
            state.user.basket.splice(state.user.basket.findIndex((id) => id === action.payload), 1);
        },

        userBasketAdd: (state, action) => {
            state.user.basket.push(action.payload)
        },

        userClosed: (state) => {
            return initialState
        },

        userMessage: (state, action) => {
            state.isLoading = false
            state.message = action.payload
        }
    },
})


export const { userLoading, userCreated, userClosed, userMessage, userChanged, userBasketRemove, userBasketAdd, hydrate } = userSlice.actions

export default userSlice.reducer