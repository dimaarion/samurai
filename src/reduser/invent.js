import { createSlice } from '@reduxjs/toolkit'
import {createArray} from "../actions";

export const inventSlice = createSlice({
    name: 'invent',
    initialState: {
        value: createArray(10),
    },
    reducers: {
        incrementInvent: (state,action) => {
            if(state.value.filter((el)=>el).length < 10){
                state.value[state.value.filter((el)=>el).length] = action.payload;
            }

        },
        decrementInvent: (state) => {
            state.value = []
        },
        incrementByAmountInvent: (state, action) => {
            state.value[action.count] = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementInvent, decrementInvent, incrementByAmountInvent } = inventSlice.actions

export default inventSlice.reducer