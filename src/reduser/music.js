import { createSlice } from '@reduxjs/toolkit'
import {get} from "lockr";


export const music = createSlice({
    name: 'music',
    initialState: {
        value: get("lockr_music"),
    },
    reducers: {
        updateMusic: (state,action) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {updateMusic} = music.actions

export default music.reducer