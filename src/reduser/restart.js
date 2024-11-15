import { createSlice } from '@reduxjs/toolkit'


export const restart = createSlice({
    name: 'restart',
    initialState: {
        value: false,
    },
    reducers: {
        incrementRestart: (state) => {
            state.value = true;
        },

        decrementRestart: (state) => {
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementRestart, decrementRestart} = restart.actions

export default restart.reducer