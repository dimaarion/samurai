import { createSlice } from '@reduxjs/toolkit'


export const settingsOpen = createSlice({
    name: 'settingsOpen',
    initialState: {
        value: false,
    },
    reducers: {
        incrementSettings: (state) => {
            state.value = true;
        },

        decrementSettings: (state) => {
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementSettings, decrementSettings} = settingsOpen.actions

export default settingsOpen.reducer