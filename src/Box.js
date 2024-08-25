import {useCallback, useEffect, useRef, useState} from "react"
import {Text, useGLTF, useTexture} from "@react-three/drei"
import {CuboidCollider, RigidBody} from "@react-three/rapier"
import create from "zustand"
import sceneUrl from "./assets/scene.glb";
import {useFrame} from "@react-three/fiber";
export default function Box(props){
    const [intersecting, setIntersection] = useState(false);
    const ref = useRef();
    const cub = useRef();
    const { nodes, materials } = useGLTF(sceneUrl)
function onClick(e){
    e.object.position.x += 1
}

useEffect(()=>{

},[])

    useFrame((state)=>{
        const t = state.clock.getElapsedTime()
       // ref.current.setLinvel({ x: 1, y: 0, z: 0 })
    })


    return (
        <>
            <RigidBody {...props}  colliders="cuboid" ref={ref}   >
                <mesh  receiveShadow castShadow >
                    <meshStandardMaterial />
                    <boxGeometry />
                </mesh>


            </RigidBody>

        </>

    )
}
useGLTF.preload("/scene.glb")