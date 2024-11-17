import {Canvas, useLoader, useThree} from "@react-three/fiber"
import {
    Sky,
    PointerLockControls,
    KeyboardControls,
    Environment,
    Cloud,
    Clouds,
    useGLTF, OrbitControls, PositionalAudio,
} from "@react-three/drei"
import {Physics} from "@react-three/rapier"
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


export default function App() {
    const restart = useSelector((state) => state.restart.value)
    const pause = useSelector((state) => state.pause.value)
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

    return (
        <>

            <TopPanel/>
            {
                pause ? <Pause/> : ""
            }
            <Settings/>
            <KeyboardControls
                map={[
                    {name: "forward", keys: ["ArrowUp", "w", "W"]},
                    {name: "backward", keys: ["ArrowDown", "s", "S"]},
                    {name: "left", keys: ["ArrowLeft", "a", "A"]},
                    {name: "right", keys: ["ArrowRight", "d", "D"]},
                    {name: "jump", keys: ["Space"]},
                ]}>
                <StartGame>
                    <Canvas shadows camera={{fov: 45}}>
                        <Clouds material={THREE.MeshBasicMaterial}>
                            <Cloud seed={10} bounds={50} volume={80} position={[40, 100, 80]}/>
                        </Clouds>
                        <CityBackground />
                        <Sky
                            distance={10} // Радиус сферы неба
                            sunPosition={[100, 10, 100]} // Позиция солнца
                            inclination={0.5} // Наклон (0 - 1)
                            azimuth={0.25} // Азимут (направление солнца)
                        />
                        <ambientLight intensity={0.8}/>
                        <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
                        <Physics gravity={[0, -10, 0]} paused={pause}>

                            <Ball/>
                            <Platform/>

                        </Physics>

                        {!pause ? <PositionalAudio hasPlaybackControl={true} autoplay loop
                                                   url="./asset/music/child-light-145463.mp3" distance={10}/> : ""}
                    </Canvas>
                </StartGame>
            </KeyboardControls>
        </>
    )
}
useGLTF.preload([
    './asset/model/level1.glb',
    './asset/model/well.glb',
    './asset/model/wheel-tree.glb'
]);