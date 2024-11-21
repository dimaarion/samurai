import {Canvas, useLoader, useThree} from "@react-three/fiber"
import {
    Sky,
    PointerLockControls,
    KeyboardControls,
    Environment,
    Cloud,
    Clouds,
    useGLTF, OrbitControls, PositionalAudio, CameraControls,
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
import {useEffect} from "react";
import Controller from 'ecctrl'
import Garage from "./components/Garage";
import garage from "./assets/garage.json"
import {Physics, RigidBody} from '@react-three/rapier'
import Plane from "./components/Plane";
import Wheel from "./components/Wheel";
import Player from "./components/Player";


export default function App() {
    const restart = useSelector((state) => state.restart.value);
    const settings = useSelector((state) => state.settings.value);
    const pause = useSelector((state) => state.pause.value);
    const music = useSelector((state) => state.music.value);
    const garageOpen = useSelector((state) => state.garageOpen.value);
    const pauseOpen = useSelector((state) => state.pauseOpen.value);
    const Background = () => {
        const {scene} = useThree();

        useEffect(() => {
            const loader = new THREE.TextureLoader();
            loader.load('./asset/texture/city.jpg', (texture) => {
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
    ];


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
                    <KeyboardControls map={keyboardMap}>
                        <Clouds material={THREE.MeshBasicMaterial}>
                            <Cloud seed={10} bounds={50} volume={80} position={[40, 100, 80]}/>
                        </Clouds>
                        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25}/>
                        <ambientLight intensity={1}/>
                        <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
                        <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
                            <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
                        </directionalLight>
                        <Physics gravity={[0, -30, 0]} paused={pause} >

                            {garage.filter((el)=>el.id === 1).map((el)=><Ball url={el.model} key = {el.id} friction={el.friction} mass = {el.mass} control = {el.control} speed={el.speed} />)}



                            <Platform/>

                        </Physics>

                        {!pause ? <PositionalAudio hasPlaybackControl={true} autoplay loop
                                                   url="./asset/sound/y2mate.com - Dmitriy Lukyanov_Underwater.mp3"
                                                   distance={music}/> : ""}

                    </KeyboardControls>

                </Canvas>
            </StartGame>

        </>
    )
}
useGLTF.preload([
    './asset/model/level1.glb',
    './asset/model/well.glb',
    './asset/model/wheel-tree.glb'
]);