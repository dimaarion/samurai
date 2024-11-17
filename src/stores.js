import { configureStore, createSlice } from '@reduxjs/toolkit'
import counterReducer from "./reduser/counterSlice";
import clickObject from "./reduser/clickObject";
import invent from "./reduser/invent";
import savePosition from "./reduser/savePosition";
import restart from "./reduser/restart"
import pause from "./reduser/pause";
import sound from "./reduser/sound";



export default configureStore({
    reducer: {
        counter: counterReducer,
        clickObject:clickObject,
        inventSlice:invent,
        savePosition:savePosition,
        restart:restart,
        pause:pause,
        sound:sound
    },
})