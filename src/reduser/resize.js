import { createSlice } from '@reduxjs/toolkit'
import {db} from "../components/Database";


export const resize = createSlice({
    name: 'resize',
    initialState: {
        value: 0,
    },
    reducers: {
        updateResize: (state,action) => {
          //  db.music.update(2, {value:action.payload,active:1})
            state.value = action.payload;
        },


    },
})

// Action creators are generated for each case reducer function
export const {updateResize} = resize.actions

export default resize.reducer