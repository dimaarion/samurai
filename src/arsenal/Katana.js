import {useFBX} from "@react-three/drei";
import katanaUrl from "../assets/Wado_Ichimonji.fbx";
import {useEffect, useRef, useState} from "react";
import {routable} from "../actions";
import {useFrame} from "@react-three/fiber";
import {useSpring, animated, config} from "@react-spring/three";
import {CuboidCollider, RigidBody} from "@react-three/rapier";


export default function Katana(props) {
    const [isClicked, setIsClicked] = useState(false);
    const fbx = useFBX(katanaUrl);
    const [active, setActive] = useState(false);
    const [swing, setSwing] = useState(false);

    const attackKatana = []

    const ref = useRef();



    const { rotation, position } = useSpring({
        from: { rotation: [0, 0, 0], position: [0, 0, 0] },
        to: [{
            rotation: swing ? [0, 0, routable(-120)] : [0, 0, 0], // Меч поворачивается вниз во время удара
            position: swing ? [0, -60, 0] : [0, 1, 0], // Меч немного опускается во время удара
        },{
            rotation: swing ? [0, 0, routable(40)] : [0, 0, 0], // Меч поворачивается вниз во время удара
            position: swing ? [0, 50, 0] : [0, 1, 0], // Меч немного опускается во время удара
        }],
        config: { mass: 1, tension: 2000, friction: 100 },
        onRest: () => setSwing(false), // Возвращаем меч в исходное положение после удара
    });


    useFrame((state) => {
        const t = state.clock.getElapsedTime();

    })


    return <group ref={ref} dispose={null}>
            <group rotation={[routable(180), routable(-90), routable(-30)]} position = {[0,0,-2]} scale={0.02} onPointerUp={() => setActive(false)} onPointerDown={() => setActive(true)}>
                <animated.mesh
                    rotation={rotation}
                    position={position}
                    onPointerDown={() => setSwing(!swing)} // Триггерим удар при клике
                >
                <primitive object={fbx}/>
                </animated.mesh>
            </group>
        </group>

}
useFBX.preload("/Wado_Ichimonji.fbx")