import {Canvas} from "@react-three/fiber"
import {Sky, PointerLockControls, KeyboardControls, Environment, Cloud, Clouds} from "@react-three/drei"
import {Physics} from "@react-three/rapier"
import {Ground} from "./Ground"
import {Player} from "./Player"
import Box from "./Box";
import * as THREE from "three";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import Invent from "./components/Invent";
import Platform from "./components/Platform";
import Ball from "./Ball";
import SavePortal from "./components/SavePortal";


export default function App() {


    return (
        <>
            <KeyboardControls
                map={[
                    {name: "forward", keys: ["ArrowUp", "w", "W"]},
                    {name: "backward", keys: ["ArrowDown", "s", "S"]},
                    {name: "left", keys: ["ArrowLeft", "a", "A"]},
                    {name: "right", keys: ["ArrowRight", "d", "D"]},
                    {name: "jump", keys: ["Space"]},
                ]}>
                <Canvas shadows  camera={{fov: 45}}>
                    <Clouds material={THREE.MeshBasicMaterial}>
                        <Cloud seed={10} bounds={50} volume={80} position={[40, 100, 80]}/>
                    </Clouds>
                    <Environment preset="city"/>
                    <Sky sunPosition={[100, 20, 100]}/>
                    <ambientLight intensity={0.8}/>
                    <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
                    <Physics debug gravity={[0, -30, 0]}>
                        <Ball/>
                        <Platform/>
                        <SavePortal position = {{x:5,y:0,z:-45}} />
                        <SavePortal position = {{x:5,y:0,z:45}} />
                    </Physics>

                    <PointerLockControls/>
                </Canvas>
            </KeyboardControls>
        </>
    )
}
