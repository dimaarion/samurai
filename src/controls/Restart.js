import {useDispatch, useSelector} from "react-redux";
import {decrementRestart, incrementRestart} from "../reduser/restart";
import {useEffect, useState} from "react";

export default function Restart(props) {
    const restart = useSelector((state) => state.restart.value)
    const dispatch = useDispatch()
    const [over, setOver] = useState({play: "#FF803F", border: "#00CAC9"});
    return <>
        <div onMouseDown={() => dispatch(incrementRestart())} onMouseUp={() => dispatch(decrementRestart())}
             onMouseOut={() => setOver({play: "#FF803F", border: "#00CAC9"})}
             onMouseOver={() => setOver({play: "#00CAC9", border: "#FF803F"})}>
            <svg width="100%" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="restart">
                    <path id="restart-c2"
                          d="M0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75Z"
                          fill={over.play} fillRule="evenodd"/>
                    <path id="restart-c"
                          d="M0 70C0 31.3401 31.3401 0 70 0C108.66 0 140 31.3401 140 70C140 108.66 108.66 140 70 140C31.3401 140 0 108.66 0 70Z"
                          fill="#1A1818" fillRule="evenodd" transform="translate(5 5)"/>
                    <g transform="translate(25 25)">
                        <rect width="100" height="100"/>
                        <path id="restart-lite"
                              d="M46 0.000401735C44.5575 -0.0199986 43.2157 0.737906 42.4884 1.9839C41.7612 3.22989 41.7612 4.77093 42.4885 6.01692C43.2157 7.26291 44.5575 8.02081 46 8.0004C67.0342 8.0004 84 24.9662 84 46.0004C84 67.0347 67.0342 84.0004 46 84.0004C24.9657 84.0004 8 67.0347 8 46.0004C8 35.0488 12.616 25.2166 20 18.2895C20 18.2895 20 26.0004 20 26.0004C19.9796 27.4429 20.7375 28.7847 21.9835 29.5119C23.2295 30.2392 24.7705 30.2392 26.0165 29.512C27.2625 28.7847 28.0204 27.4429 28 26.0004C28 26.0004 28 4.0004 28 4.0004C28 4.0004 6 4.0004 6 4.0004C4.55746 3.98 3.21567 4.73791 2.48845 5.9839C1.76122 7.22989 1.76123 8.77093 2.48846 10.0169C3.21568 11.2629 4.55747 12.0208 6.00002 12.0004C6.00002 12.0004 15.0508 12.0004 15.0508 12.0004C5.8134 20.4194 0 32.545 0 46.0004C0 71.3582 20.6422 92.0004 46 92.0004C71.3577 92.0004 92 71.3582 92 46.0004C92 20.6426 71.3577 0.000401735 46 0.000401735C46 0.000401735 46 0.000401735 46 0.000401735Z"
                              fill={over.border} fillRule="evenodd" transform="translate(4 4)"/>
                    </g>
                </g>
            </svg>
        </div>
    </>
}