import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'


const rootReducer = combineReducers({
    userReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState().userReducer))
})
