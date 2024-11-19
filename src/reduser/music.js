import { createSlice } from '@reduxjs/toolkit'
import {db} from "../components/Database";


export const music = createSlice({
    name: 'music',
    initialState: {
        value: 0,
    },
    reducers: {
        updateMusic: (state,action) => {
            db.music.update(1, {value:action.payload,active:1})
            state.value = action.payload;
        },


    },
})

// Action creators are generated for each case reducer function
export const {updateMusic} = music.actions

export default music.reducer