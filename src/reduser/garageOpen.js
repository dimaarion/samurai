import { createSlice } from '@reduxjs/toolkit'


export const garageOpen = createSlice({
    name: 'garageOpen',
    initialState: {
        value: false,
    },
    reducers: {
        incrementGarages: (state) => {
            state.value = true;
        },

        decrementGarages: (state) => {
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementGarages, decrementGarages} = garageOpen.actions

export default garageOpen.reducer