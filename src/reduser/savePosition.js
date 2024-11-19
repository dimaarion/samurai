import { createSlice } from '@reduxjs/toolkit'
import {db} from "../components/Database";


export const savePosition = createSlice({
    name: 'savePosition',
    initialState: {
        value: {x:0,y:0,z:0},
    },
    reducers: {
        incrementSave: (state,action) => {
            db.friends.update(1013, action.payload)
            state.value = action.payload;
        },

        decrementSave: (state) => {
            state.value = {x:0,y:0,z:0}
        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementSave, decrementSave} = savePosition.actions

export default savePosition.reducer