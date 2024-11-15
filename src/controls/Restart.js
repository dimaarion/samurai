import {useDispatch, useSelector} from "react-redux";
import {decrementRestart, incrementRestart} from "../reduser/restart";
import {useEffect} from "react";

export default function Restart(props) {
    const restart = useSelector((state) => state.restart.value)
    const dispatch = useDispatch()

    return <>
        <div onMouseDown={() => dispatch(incrementRestart())} onMouseUp={() => dispatch(decrementRestart())}
             className="absolute top-0 right-0 w-[100px] h-[100px] z-10 cursor-pointer">
            <svg style={{width: '50px', height: '50px', fill: '#000000'}} viewBox="0 0 512 512"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
            </svg>
        </div>
    </>
}