import {createSlice} from '@reduxjs/toolkit'
import {db} from "../components/Database";



export const sound = createSlice({
    name: 'sound',
    initialState: {
        value: 0,
    },
    reducers: {
        updateSound: (state, action) => {
            state.value = action.payload;
        },
        getSound: (state) => {
            db.music?.where("name").startsWithAnyOfIgnoreCase(["sound"]).first().then((rez) => {
                console.log(rez)
                state.value = rez.values;
            })

        }
    },
})

// Action creators are generated for each case reducer function
export const {updateSound,getSound} = sound.actions

export default sound.reducer