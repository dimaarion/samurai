import { createSlice } from '@reduxjs/toolkit'
import {db} from "../components/Database";


export const sound = createSlice({
    name: 'sound',
    initialState: {
        value: 0,
    },
    reducers: {
        updateSound: (state,action) => {
            db.music.update(2, {value:action.payload,active:1})
            state.value = action.payload;
        },


    },
})

// Action creators are generated for each case reducer function
export const {updateSound} = sound.actions

export default sound.reducer