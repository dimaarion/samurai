import {useDispatch} from "react-redux";
import {useState} from "react";

export default function LevelBtn() {
    const dispatch = useDispatch();
    const [over, setOver] = useState({play: "#FF803F", border: "#00CAC9"});
    return <>
        <svg onMouseOut={() => setOver({play: "#FF803F", border: "#00CAC9"})}
             onMouseOver={() => setOver({play: "#00CAC9", border: "#FF803F"})} width="100%" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="levels">
                <path id="levels-c2"
                      d="M0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75Z"
                      fill={over.border} fillRule="evenodd"/>
                <path id="levels-c"
                      d="M0 70C0 31.3401 31.3401 0 70 0C108.66 0 140 31.3401 140 70C140 108.66 108.66 140 70 140C31.3401 140 0 108.66 0 70Z"
                      fill="#1A1818" fillRule="evenodd" transform="translate(5 5)"/>
                <g transform="translate(31 34)">
                    <rect width="88" height="82"/>
                    <path id="Orange Layer Group1"
                          d="M31 0C36.5236 0 41 4.4764 41 10L41 28C41 33.5236 36.5236 38 31 38L10 38C4.4764 38 0 33.5236 0 28L0 10C0 4.4764 4.4764 0 10 0L31 0Z"
                          fill={over.play}/>
                    <path id="Orange Layer Group2"
                          d="M31 0C36.5236 0 41 4.4764 41 10L41 28C41 33.5236 36.5236 38 31 38L10 38C4.4764 38 0 33.5236 0 28L0 10C0 4.4764 4.4764 0 10 0L31 0Z"
                          fill={over.play} transform="translate(47 0)"/>
                    <path id="Orange Layer Group3"
                          d="M31 0C36.5236 0 41 4.4764 41 10L41 28C41 33.5236 36.5236 38 31 38L10 38C4.4764 38 0 33.5236 0 28L0 10C0 4.4764 4.4764 0 10 0L31 0Z"
                          fill={over.play} transform="translate(0 44)"/>
                    <path id="Orange Layer Group4"
                          d="M31 0C36.5236 0 41 4.4764 41 10L41 28C41 33.5236 36.5236 38 31 38L10 38C4.4764 38 0 33.5236 0 28L0 10C0 4.4764 4.4764 0 10 0L31 0Z"
                          fill={over.play} transform="translate(47 44)"/>
                </g>
            </g>
        </svg>
    </>
}