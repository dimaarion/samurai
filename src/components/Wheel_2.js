import {useGLTF} from "@react-three/drei";
import {useRef} from "react";

export default function Wheel_2(props){
    const ref = useRef()

    const {scene} = useGLTF(props.url?props.url:"./asset/model/wheel-tree.glb");
    return <>
        <group>
            <primitive castShadow receiveShadow object={scene} ref={ref} scale={[1.5,1,1]} />
        </group>
    </>
}