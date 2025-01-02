import {Canvas, useLoader, useThree} from "@react-three/fiber"
import {
    Sky,
    PointerLockControls,
    KeyboardControls,
    Environment,
    Cloud,
    Clouds,
    useGLTF, OrbitControls, PositionalAudio, CameraControls, Gltf, PerspectiveCamera, OrthographicCamera,
} from "@react-three/drei"

import * as THREE from "three";
import Platform from "./components/Platform";
import {useSelector} from "react-redux";
import Pause from "./components/Pause";
import StartGame from "./components/StartGame";
import TopPanel from "./components/TopPanel";
import Settings from "./components/Settings";
import {useEffect, useRef} from "react";
import Garage from "./components/Garage";
import garage from "./assets/garage.json"
import level from "./assets/level.json"
import {Physics} from '@react-three/rapier'
import Wheel from "./components/Wheel";
import {get, set, setPrefix} from "lockr";



export default function App() {
    const restart = useSelector((state) => state.restart.value);
    const settings = useSelector((state) => state.settings.value);
    const pause = useSelector((state) => state.pause.value);
    const music = useSelector((state) => state.music.value);
    const garageOpen = useSelector((state) => state.garageOpen.value);
    const pauseOpen = useSelector((state) => state.pauseOpen.value);
    const selectGarage = useSelector((state) => state.garage.value);
    const sound = useRef();

    const Background = () => {
        const {scene} = useThree();

        useEffect(() => {
            const loader = new THREE.TextureLoader();
            loader.load('./asset/texture/city.png', (texture) => {
                scene.background = texture; // Устанавливаем текстуру фоном
            });
        }, [scene]);

        return null;
    };

    const keyboardMap = [
        {name: "forward", keys: ["ArrowUp", "w", "W"]},
        {name: "backward", keys: ["ArrowDown", "s", "S"]},
        {name: "leftward", keys: ["ArrowLeft", "a", "A"]},
        {name: "rightward", keys: ["ArrowRight", "d", "D"]},
        {name: "jump", keys: ["Space"]},
        {name: "action4", keys: ["KeyF"]},
    ];

    const keyboardMap2 = [
        {name: 'forward', keys: ['ArrowUp', 'KeyW']},
        {name: 'backward', keys: ['ArrowDown', 'KeyS']},
        {name: 'left', keys: ['ArrowLeft', 'KeyA']},
        {name: 'right', keys: ['ArrowRight', 'KeyD']},
        {name: 'run', keys: ['Shift']},
        {name: 'brake', keys: ['Space']},
        {name: 'gearUp', keys: ['Period']},
        {name: 'gearDown', keys: ['Comma']},
    ];

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                sound.current?.pause(); // Остановить звук, если вкладка невидима
            } else {
                sound.current?.play(); // Воспроизвести звук, если вкладка активна
            }
        };

        // Слушаем изменения видимости страницы
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };


    }, []);
    setPrefix("lockr_")
    if (!get("lockr_levels")) {
        set("lockr_levels", level)
    }
    if (!get("lockr_garage")) {
        set("lockr_garage", garage)
    }
console.log(selectGarage)

    return (
        <>

            <TopPanel/>
            {
                pauseOpen ? <Pause/> : ""
            }
            {settings ? <Settings/> : ""}
            {garageOpen ? <Garage/> : ""}

            <StartGame>
                <Canvas shadows camera={{fov: 45}}>
                    <Environment background={true}  path={"./asset/texture/"} files={"hilly_terrain_01_puresky_1k.hdr"} ground={{scale:200,radius:5000,height:100}}/>
                    <KeyboardControls map={keyboardMap}>

                        <Physics debug={true} gravity={[0, -20, 0]} paused={pause}>
                            {get("lockr_levels").filter((el) => el.level === 1).map((el) => <Platform
                                key={el.level + "platform"}
                                level={el.level}
                                url={el.model}
                                position={el.position}
                                actionsArray={el.animations}/>)}
                            {selectGarage.filter((el) => el.id === 1 && !restart).map((el) => <Wheel url={el.model}
                                                                                               position={el.position}
                                                                                               key={el.id}
                                                                                               friction={el.friction}
                                                                                               mass={el.mass}
                                                                                               control={el.control}
                                                                                               speed={el.speed}/>)}


                        </Physics>

                        <PositionalAudio
                            ref={sound}
                            hasPlaybackControl={true}
                            autoplay={true}
                            loop={false}
                            url="./asset/sound/y2mate.com - Dmitriy Lukyanov_Underwater.mp3"
                            distance={music}
                        />
                    </KeyboardControls>

                </Canvas>
            </StartGame>

        </>
    )
}
useGLTF.preload([

    './asset/model/well.glb',
    './asset/model/wheel-tree.glb',
    './asset/model/wheel_1.glb',
    './asset/model/hest.glb',
]);