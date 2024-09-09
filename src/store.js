import { configureStore, createSlice } from '@reduxjs/toolkit'
import counterReducer from "./reduser/counterSlice";
import clickObject from "./reduser/clickObject";
import invent from "./reduser/invent";



export default configureStore({
    reducer: {
        counter: counterReducer,
        clickObject:clickObject,
        inventSlice:invent
    },
})