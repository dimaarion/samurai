import {useFBX} from "@react-three/drei";
import katanaUrl from "../assets/Wado_Ichimonji.fbx";
import {useEffect, useState} from "react";
import {routable} from "../actions";
import {useFrame} from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";


export default function Katana(props) {
    const [isClicked, setIsClicked] = useState(false);
    const fbx = useFBX(katanaUrl);
    const [active, setActive] = useState(false);
    const attackKatana = []

    const {position} = useSpring({
        from: {position: [1,1,0]},
        to: [
            {position:[1,-0.8,0]},
            {position:[2,1.5,0]},
            {position:[1,1,0]},

        ],

        config: { tension: 4000}
    });

    const {rotation} = useSpring({
        from:  {rotation:[0,0,0]},
        to: [

            {rotation:[0,0,-1]},
            {rotation:[0,0,0.2]},
            {rotation:[0,0,0]},


        ],

        config: { tension: 4000 }
    });

    useFrame((state)=>{
        const t = state.clock.getElapsedTime();

    })
    useEffect(() => {

    }, []);
    return  <group dispose={null} {...props}>
        <group rotation={[routable(180), routable(-90), routable(-40)]} >
            <animated.mesh position={position} rotation={rotation} scale={0.02} onPointerDown = {()=>setActive(true)} onPointerUp = {()=>setActive(false)}>
                <primitive object={fbx} />
            </animated.mesh>

        </group>
    </group>
}
useFBX.preload("/Wado_Ichimonji.fbx")