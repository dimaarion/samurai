import {useState} from "react";
import {useDispatch} from "react-redux";
import {incrementGarages} from "../reduser/garageOpen";
import {decrementSettings} from "../reduser/settingsOpen";
import {decrementPauseOpen} from "../reduser/pauseOpen";
import {incrementPause} from "../reduser/pause";

export default function GarageBtn(){
    const [over, setOver] = useState({play:"#FF803F",border:"#00CAC9"});
    const dispatch = useDispatch();
    return <>
        <svg onClick={()=>{
            dispatch(incrementGarages());
            dispatch(decrementSettings());
            dispatch(decrementPauseOpen());
            dispatch(incrementPause());
        }
        } onMouseOut={() => setOver({play: "#FF803F", border: "#00CAC9"})}
              onMouseOver={() => setOver({play: "#00CAC9", border: "#FF803F"})} width="100%" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="garage">
                <path id="garage-c" d="M0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75Z"
                      fill={over.play} fillRule="evenodd" />
                <path id="garage-c2" d="M0 70C0 31.3401 31.3401 0 70 0C108.66 0 140 31.3401 140 70C140 108.66 108.66 140 70 140C31.3401 140 0 108.66 0 70Z"
                      fill="#1A1818" fillRule="evenodd" transform="translate(5 5)" />
                <g transform="translate(25 25)">
                    <rect width="100" height="100" />
                    <path id="garage-figure"
                          d="M16.6667 66.6667C16.6667 66.6667 6.66667 66.6667 6.66667 66.6667C4.33312 66.6667 3.16633 66.6667 2.27504 66.2125C1.49104 65.8129 0.853625 65.1758 0.454124 64.3917C0 63.5004 0 62.3337 0 60C0 60 0 20.9992 0 20.9992C0 19.431 0 18.6468 0.246625 17.9623C0.464583 17.3572 0.819708 16.8108 1.28413 16.3658C1.8095 15.8625 2.52604 15.544 3.95908 14.9071C3.95908 14.9071 37.5 0 37.5 0C37.5 0 71.0408 14.9071 71.0408 14.9071C72.4742 15.544 73.1904 15.8625 73.7158 16.3658C74.1804 16.8108 74.5354 17.3572 74.7533 17.9623C75 18.6468 75 19.431 75 20.9992C75 20.9992 75 60 75 60C75 62.3337 75 63.5004 74.5458 64.3917C74.1462 65.1758 73.5092 65.8129 72.725 66.2125C71.8338 66.6667 70.6671 66.6667 68.3333 66.6667C68.3333 66.6667 58.3333 66.6667 58.3333 66.6667M16.6666 66.6667L16.6666 25L58.3333 25L58.3333 66.6667M16.6666 66.6667L58.3333 66.6667" fill="none" strokeWidth="8"
                          stroke={over.border} strokeLinecap="round" strokeLinejoin="round" transform="translate(12.5 16.667)" />
                </g>
            </g>
        </svg>
    </>
}