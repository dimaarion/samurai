import {useState} from "react";
import {useDispatch} from "react-redux";
import {decrementSettings} from "../reduser/settingsOpen";
import {incrementPauseOpen} from "../reduser/pauseOpen";
import {incrementPause} from "../reduser/pause";

export default function PauseBtn() {
    const [over, setOver] = useState({play:"#FF803F",border:"#00CAC9"});
    const dispatch = useDispatch();
    return <>
        <svg onClick={()=> {
            dispatch(incrementPauseOpen());
            dispatch(decrementSettings());
            dispatch(incrementPause());
        }} onMouseOut={() => setOver({play: "#FF803F", border: "#00CAC9"})}
             onMouseOver={() => setOver({play: "#00CAC9", border: "#FF803F"})} width="100%" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="pause">
                <path id="pause-c2"
                      d="M0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25Z"
                      fill={over.play} fillRule="evenodd"/>
                <path id="pause-c"
                      d="M0 23.3333C0 10.4467 10.4467 0 23.3333 0C36.22 0 46.6667 10.4467 46.6667 23.3333C46.6667 36.22 36.22 46.6667 23.3333 46.6667C10.4467 46.6667 0 36.22 0 23.3333Z"
                      fill="#1A1818" fillRule="evenodd" transform="translate(1.5 1.5)"/>
                <g transform="translate(10 10)">
                    <rect width="30" height="30"/>
                    <path id="pause-[#1006]"
                          d="M3.75 0C1.67999 0 0 1.67999 0 3.75C0 3.75 0 26.25 0 26.25C0 28.32 1.67999 30 3.75 30C5.82001 30 7.5 28.32 7.5 26.25C7.5 26.25 7.5 3.75 7.5 3.75C7.5 1.67999 5.82001 0 3.75 0C3.75 0 3.75 0 3.75 0ZM22.5 3.75C22.5 3.75 22.5 26.25 22.5 26.25C22.5 28.32 20.82 30 18.75 30C16.68 30 15 28.32 15 26.25C15 26.25 15 3.75 15 3.75C15 1.67999 16.68 0 18.75 0C20.82 0 22.5 1.67999 22.5 3.75C22.5 3.75 22.5 3.75 22.5 3.75Z"
                          fill={over.border} fillRule="evenodd" transform="translate(3.75 0)"/>
                </g>
            </g>
        </svg>
    </>
}