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
import {get,set,setPrefix} from "lockr";
import {routable} from "./actions";
import Wheel_2 from "./components/Wheel_2";
import Experience from "./components/Experience";
import Car from "./components/Car";
import Plane from "./components/Plane";


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

    const keyboardMap2 = [
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'run', keys: ['Shift'] },
        { name: 'brake', keys: ['Space'] },
        { name: 'gearUp', keys: ['Period'] },
        { name: 'gearDown', keys: ['Comma'] },
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

                    <hemisphereLight intensity={0.45 * Math.PI} />
                    <spotLight decay={0} angle={0.4} penumbra={1} position={[20, 30, 2.5]} castShadow shadow-bias={-0.00001} />
                    <directionalLight decay={0} color="red" position={[-10, -10, 0]} intensity={1.5} />
                    <Clouds material={THREE.MeshBasicMaterial}>
                        <Cloud seed={10} bounds={50} volume={80} position={[40, 0, -80]} />
                        <Cloud seed={10} bounds={50} volume={80} position={[-40, 10, -80]} />
                    </Clouds>
                    <Environment preset="city" />
                    <Sky />
                    <KeyboardControls map={keyboardMap}>

                        <PerspectiveCamera  fov={75} rotation={[0, Math.PI, 0]} position={[0, 10, 20]} />
                        <OrthographicCamera
                            near={-1000}
                            far={1000}
                            position={[0, 100, 0]}
                            rotation={[(-1 * Math.PI) / 2, 0, Math.PI]}
                            zoom={15}
                        />
                        <Physics debug={false} gravity={[0, -30, 0]} paused={pause}>
                            {level.filter((el) => el.level === 1).map((el) => <Platform key={el.level + "platform"}
                                                                                        url={el.model}
                                                                                        position={el.position}
                                                                                        actionsArray={el.animations}/>)}
                            {garage.filter((el) => el.id === 1 && !restart).map((el) => <Car url={el.model}
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
    './asset/model/level1.glb',
    './asset/model/well.glb',
    './asset/model/wheel-tree.glb',
    './asset/model/wheel_1.glb',
    './asset/model/level_1_1.glb'
]);