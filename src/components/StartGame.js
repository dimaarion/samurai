import {Suspense, useEffect, useState} from 'react'
import {useProgress} from "@react-three/drei";
import {incrementPause, decrementPause} from "../reduser/pause";
import {useSelector,useDispatch} from "react-redux";

export default function StartGame({children}) {
    const [ready, setReady] = useState(false);
    const [play, setPlay] = useState(false);
    const [over, setOver] = useState({play:"#FF7E3D",border:"#00CAC9"})
    const pause = useSelector((state) => state.pause.value)
    const dispatch = useDispatch();

    function Ready({setReady}) {
        useEffect(() => () =>setReady(true), [])
        return null
    }

    function Loader() {
        const {progress} = useProgress()
        return <div>Загрузка {progress.toFixed()} %</div>
    }

    const controlOptions = [
        {keys: ['↑', 'W'], action: 'Вперед'},
        {keys: ['←', 'A'], action: 'Влево'},
        {keys: ['→', 'D'], action: 'Вправо'},
        {keys: ['↓', 'S'], action: 'Назад'},
        {keys: ['Space'], action: 'Прыжок'},
    ]

    return <>
        <Suspense fallback={<Ready setReady={setReady}/>}>{children}</Suspense>
        {!play?<div className="fixed w-full h-full z-50 bg-gray-950 top-0 bottom-0 left-0 right-0">
            <div className="text-white flex justify-center w-full absolute bottom-0 top-0">
                <div className="self-center grid gap-4 text-md">
                    {controlOptions.map((left) => <div key={left.action} className="flex grid grid-cols-4 gap-2">
                        <div className="self-center mr-2">{left.action}</div>
                        {left.keys.map((right) => <div
                            key={right} className="mx-2 bg-white text-black p-2 text-center">{right}</div>)}
                    </div>)}
                    <div className="flex">
                        <div className="mt-6 mr-6">
                            <Loader/>
                        </div>

                         <div className="w-20 cursor-pointer" title={"Играть"}
                                      onClick={()=> {
                                          dispatch(decrementPause());
                                          setPlay(true);
                                      }}
                                      onMouseOut={() => setOver({play: "#FF7E3D", border: "#00CAC9"})}
                                      onMouseOver={() => setOver({play: "#00CAC9", border: "#FF7E3D"})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"
                                 fill="none">
                                <defs>
                                    <clipPath id="clip_path_1">
                                        <rect width="100" height="100"/>
                                    </clipPath>
                                </defs>
                                <g id="play-group">
                                    <path id="Овал"
                                          d="M0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75Z"
                                          fill={over.border} fillRule="evenodd"/>
                                    <path id="Овал2"
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
                        </div>
                    </div>

                </div>

            </div>
        </div>:""}
    </>
}