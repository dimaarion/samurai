import {configureStore} from '@reduxjs/toolkit'
import counterReducer from "./reduser/counterSlice";
import clickObject from "./reduser/clickObject";
import invent from "./reduser/invent";
import savePosition from "./reduser/savePosition";
import restart from "./reduser/restart"
import pause from "./reduser/pause";
import music from "./reduser/music";
import sound from "./reduser/sound";
import settingsOpen from "./reduser/settingsOpen";
import garageOpen from "./reduser/garageOpen";
import pauseOpen from "./reduser/pauseOpen";
import resize from "./reduser/resize";



export default configureStore({
    reducer: {
        counter: counterReducer,
        clickObject:clickObject,
        inventSlice:invent,
        savePosition:savePosition,
        restart:restart,
        pause:pause,
        music:music,
        sound:sound,
        settings:settingsOpen,
        garageOpen:garageOpen,
        pauseOpen:pauseOpen,
        resize:resize
    },
})