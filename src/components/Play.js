import {useState} from "react";
import {useDispatch} from "react-redux";
import {decrementPause} from "../reduser/pause";

export default function Play() {
    const [over, setOver] = useState({play: "#FF803F", border: "#00CAC9"});
    const dispatch = useDispatch();
    return <>
        <svg onClick={()=>dispatch(decrementPause())} width="100%" onMouseOut={() => setOver({play: "#FF803F", border: "#00CAC9"})}
             onMouseOver={() => setOver({play: "#00CAC9", border: "#FF803F"})} viewBox="0 0 150 150" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="clip_path_1">
                    <rect width="100" height="100"/>
                </clipPath>
            </defs>
            <g id="play">
                <path id="play-c2"
                      d="M0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75Z"
                      fill={over.border} fillRule="evenodd"/>
                <path id="play-c"
                      d="M0 70C0 31.3401 31.3401 0 70 0C108.66 0 140 31.3401 140 70C140 108.66 108.66 140 70 140C31.3401 140 0 108.66 0 70Z"
                      fill="#1A1818" fillRule="evenodd" transform="translate(5 5)"/>
                <g clipPath="url(#clip_path_1)" transform="translate(36 25)">
                    <rect width="100" height="100"/>
                    <path id="play"
                          d="M76.4822 44.9041C76.4822 44.9041 8.63571 1.17892 8.63571 1.17892C4.61066 -0.988923 0 -0.763747 0 7.01824C0 7.01824 0 93.1184 0 93.1184C0 100.233 4.94646 101.354 8.63571 98.9577C8.63571 98.9577 76.4822 55.2325 76.4822 55.2325C79.275 52.3789 79.275 47.7577 76.4822 44.9041C76.4822 44.9041 76.4822 44.9041 76.4822 44.9041Z"
                          fill={over.play} fillRule="evenodd" transform="translate(12.714 -0.068)"/>
                </g>
            </g>
        </svg>
    </>
}