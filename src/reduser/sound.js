import { createSlice } from '@reduxjs/toolkit'


export const sound = createSlice({
    name: 'sound',
    initialState: {
        value: 0,
    },
    reducers: {
        incrementSounds: (state,action) => {
            state.value = action.payload;
        },

        decrementSounds: (state) => {
            state.value -= 1;
        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementSounds, decrementSounds} = sound.actions

export default sound.reducer