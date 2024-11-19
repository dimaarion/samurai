import { createSlice } from '@reduxjs/toolkit'


export const pauseOpen = createSlice({
    name: 'pauseOpen',
    initialState: {
        value: false,
    },
    reducers: {
        incrementPauseOpen: (state) => {
            state.value = true;
        },

        decrementPauseOpen: (state) => {
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementPauseOpen, decrementPauseOpen} = pauseOpen.actions

export default pauseOpen.reducer