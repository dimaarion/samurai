import {Canvas} from "@react-three/fiber"
import {
    Sky,
    PointerLockControls,
    KeyboardControls,
    Environment,
    Cloud,
    Clouds,
    useGLTF, OrbitControls,
} from "@react-three/drei"
import {Physics} from "@react-three/rapier"
import * as THREE from "three";
import Platform from "./components/Platform";
import Ball from "./Ball";
import CityBackground from "./components/CityBackground";
import {useSelector} from "react-redux";
import Pause from "./components/Pause";
import StartGame from "./components/StartGame";


export default function App() {
    const restart = useSelector((state) => state.restart.value)
    const pause = useSelector((state) => state.pause.value)

    return (
        <>

            <Pause/>
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
                        <Environment preset="city"/>
                        <Sky sunPosition={[100, 20, 100]}/>
                        <ambientLight intensity={0.8}/>
                        <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
                        <Physics gravity={[0, -10, 0]} paused={pause}>

                            <Ball/>
                            <Platform/>

                        </Physics>
                        <CityBackground/>

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