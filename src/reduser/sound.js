import {createSlice} from '@reduxjs/toolkit'
import {db} from "../components/Database";



export const sound = createSlice({
    name: 'sound',
    initialState: {
        value: 0,
    },
    reducers: {
        getSound: (state, action) => {
            state.value = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {getSound} = sound.actions

export default sound.reducer