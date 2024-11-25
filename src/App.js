import {Canvas, useLoader, useThree} from "@react-three/fiber"
import {
    Sky,
    PointerLockControls,
    KeyboardControls,
    Environment,
    Cloud,
    Clouds,
    useGLTF, OrbitControls, PositionalAudio, CameraControls, Gltf, PerspectiveCamera,
} from "@react-three/drei"

import * as THREE from "three";
import Platform from "./components/Platform";
import Ball from "./Ball";
import CityBackground from "./components/CityBackground";
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



export default function App() {
    const restart = useSelector((state) => state.restart.value);
    const settings = useSelector((state) => state.settings.value);
    const pause = useSelector((state) => state.pause.value);
    const music = useSelector((state) => state.music.value);
    const garageOpen = useSelector((state) => state.garageOpen.value);
    const pauseOpen = useSelector((state) => state.pauseOpen.value);
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
                    <Sky/>
                    <hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue"/>
                    <directionalLight castShadow intensity={0.2} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001}
                                      position={[10, 50, -10]}/>
                    <ambientLight intensity={1}/>
                    <pointLight castShadow intensity={0.8} position={[50, 100, 50]}/>

                    <KeyboardControls map={keyboardMap}>
                        <Physics debug={false} gravity={[0, -30, 0]} paused={pause}>
                            {level.filter((el) => el.level === 1).map((el) => <Platform key={el.level + "platform"}
                                                                                        url={el.model}
                                                                                        actionsArray={el.animations}/>)}
                            {garage.filter((el) => el.id === 1 && !restart).map((el) => <Wheel url={el.model}
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
                            autopla={true}
                            loop={true}
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
    './asset/model/level1.glb',
    './asset/model/well.glb',
    './asset/model/wheel-tree.glb',
    './asset/model/wheel_1.glb',
    './asset/model/level_1_1.glb'
]);