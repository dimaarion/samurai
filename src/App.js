import {Canvas} from "@react-three/fiber"
import {Sky, PointerLockControls, KeyboardControls, Environment, Cloud, Clouds} from "@react-three/drei"
import {Physics} from "@react-three/rapier"
import {Ground} from "./Ground"
import {Player} from "./Player"
import Box from "./Box";
import * as THREE from "three";


export default function App() {

    return (
        <KeyboardControls
            map={[
                {name: "forward", keys: ["ArrowUp", "w", "W"]},
                {name: "backward", keys: ["ArrowDown", "s", "S"]},
                {name: "left", keys: ["ArrowLeft", "a", "A"]},
                {name: "right", keys: ["ArrowRight", "d", "D"]},
                {name: "jump", keys: ["Space"]},
            ]}>
            <Canvas shadows camera={{fov: 45}}>
                <Clouds material={THREE.MeshBasicMaterial}>
                    <Cloud seed={10} bounds={50} volume={80} position={[40, 100, 80]}/>
                </Clouds>
                <Environment preset="city"/>
                <Sky sunPosition={[100, 20, 100]}/>
                <ambientLight intensity={0.8}/>
                <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
                <Physics debug={true} gravity={[0, -30, 0]}>
                    <Ground/>
                    <Player/>
                    <Box position={[0, 3.5, -10]}/>
                    <Box position={[0, 3, -10]}/>
                    <Box position={[0, 2, -10]}/>
                    <Box position={[0, 1.5, -10]}/>
                    <Box position={[0, 0.5, -10]}/>
                </Physics>

                <PointerLockControls/>
            </Canvas>
        </KeyboardControls>
    )
}
