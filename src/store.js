import { configureStore, createSlice } from '@reduxjs/toolkit'
import counterReducer from "./reduser/counterSlice";



export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})