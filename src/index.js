import {useState} from "react";
import {createRoot} from "react-dom/client";
import {Footer} from "@pmndrs/branding";
import "./styles.css";
import "./index.css";
import App from "./App";
import store from './stores';
import {Provider} from 'react-redux';




createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
