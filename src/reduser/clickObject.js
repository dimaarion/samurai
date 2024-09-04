import { createSlice } from '@reduxjs/toolkit'

export const clickObject = createSlice({
    name: 'clickObject',
    initialState: {
        value: false,
    },
    reducers: {
        increment: (state) => {
            state.value = true;
        },
        decrement: (state) => {
            state.value = false
        },
        incrementByAmount: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = clickObject.actions

export default clickObject.reducer