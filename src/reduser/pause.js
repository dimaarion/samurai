import { createSlice } from '@reduxjs/toolkit'


export const pause = createSlice({
    name: 'pause',
    initialState: {
        value: true,
    },
    reducers: {
        incrementPause: (state) => {
            state.value = true;
        },

        decrementPause: (state) => {
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementPause, decrementPause} = pause.actions

export default pause.reducer