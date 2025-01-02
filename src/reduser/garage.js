import { createSlice } from '@reduxjs/toolkit'
import {get, set} from "lockr";


export const garage = createSlice({
    name: 'garage',
    initialState: {
        value: get("lockr_garage"),
    },
    reducers: {
        updateGarage: (state,action) => {
            state.value = action.payload;
            set("lockr_garage",action.payload)
        },


    },
})

// Action creators are generated for each case reducer function
export const {updateGarage} = garage.actions

export default garage.reducer