import {useFBX} from "@react-three/drei";
import katanaUrl from "../assets/Wado_Ichimonji.fbx";
import {useEffect, useRef, useState} from "react";
import {routable} from "../actions";
import {useFrame} from "@react-three/fiber";
import {useSpring, animated, config} from "@react-spring/three";
import {decrement, increment, incrementByAmount} from '../reduser/clickObject.js'
//import {incrementCount, decrementCount} from '../reduser/counterSlice.js'
import {useDispatch, useSelector} from "react-redux";


export default function Katana(props) {
    const [isClicked, setIsClicked] = useState(false);
    const fbx = useFBX(katanaUrl);
    const [active, setActive] = useState(false);
    const [swing, setSwing] = useState(false);
    const clickObject = useSelector((state) => state.clickObject.value)
    const dispatch = useDispatch()
    const attackKatana = []

    const ref = useRef();
    const sens = useRef();

    let count = 1;


    let attack = [{
        rotation: clickObject? [0, 0, routable(-120)] : [0, 0, 0],
        position: clickObject? [0, -80, 0] : [0, 1, 0],
    }, {
        rotation: clickObject? [0, 0, routable(40)] : [0, 0, 0],
        position: clickObject? [0, 50, 0] : [0, 1, 0],
    }];

    let attack2 = [{
        rotation: clickObject? [0, routable(-30), routable(-120)] : [0, 0, 0],
        position: clickObject? [-10, -80, -50] : [0, 1, 0],
    }, {
        rotation: clickObject? [0, 0, routable(40)] : [0, 0, 0],
        position: clickObject? [0, 50, 0] : [0, 1, 0],
    }]

    let attack3 = [{
        rotation: clickObject? [0, routable(30), routable(-120)] : [0, 0, 0],
        position: clickObject? [-10, -80, 50] : [0, 1, 0],
    }, {
        rotation: clickObject? [0, 0, routable(40)] : [0, 0, 0],
        position: clickObject? [0, 50, 0] : [0, 1, 0],
    }]

    let attack4 = [{
        rotation: clickObject? [0, 0, routable(-120)] : [0, 0, 0],
        position: clickObject? [-80, 80, 0] : [0, 1, 0],
    }, {
        rotation: clickObject? [0, 0, routable(-10)] : [0, 0, 0],
        position: clickObject? [150, 0, 0] : [0, 0, 0],
    },{
        rotation: clickObject? [0, 0, 0] : [0, 0, 0],
        position: clickObject? [0, 0, 0] : [0, 0, 0],
    }]


    if(count === 1){
        attack = [... attack4];
    }

    const {rotation, position} = useSpring({
        from: {rotation: [0, 0, 0], position: [0, 0, -2]},
        to: [attack],
        config: {mass: 1, tension: 2000, friction: 100},
        onRest: () => dispatch(decrement()),
    });
/*{
            rotation: clickObject && attack === 0? [0, 0, routable(-120)] : [0, 0, 0],
            position: clickObject && attack === 0? [0, -80, 0] : [0, 1, 0],
        }, {
            rotation: clickObject && attack === 0? [0, 0, routable(40)] : [0, 0, 0],
            position: clickObject && attack === 0? [0, 50, 0] : [0, 1, 0],
        },{
            rotation: clickObject && attack === 1? [0, 0, routable(-120)] : [0, 0, 0],
            position: clickObject && attack === 1? [0, -80, 0] : [0, 1, 0],
        }, {
            rotation: clickObject && attack === 1? [0, 0, routable(40)] : [0, 0, 0],
            position: clickObject && attack === 1? [0, 50, 0] : [0, 1, 0],
        },{
            rotation: clickObject && attack === 1? [routable(30), 0, routable(-120)] : [0, 0, 0],
            position: clickObject && attack === 1? [0, -80, -30] : [0, 1, 0],
        }, {
            rotation: clickObject && attack === 1? [0, 0, routable(40)] : [0, 0, 0],
            position: clickObject && attack === 1? [0, 50, 0] : [0, 1, 0],
        },{
            rotation: clickObject && attack === 2? [routable(-30), 0, routable(-120)] : [0, 0, 0],
            position: clickObject && attack === 2? [0, -80, 30] : [0, 1, 0],
        }, {
            rotation: clickObject && attack === 2? [0, 0, routable(40)] : [0, 0, 0],
            position: clickObject && attack === 2? [0, 50, 0] : [0, 1, 0],
        }*/

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
    })

    useEffect(() => {

    }, []);


    return <group {...props} type={"kinematicPosition"} ref={ref} >
        <animated.mesh position={position} rotation={rotation}>
            <primitive object={fbx}/>
        </animated.mesh>
    </group>


}
useFBX.preload("/Wado_Ichimonji.fbx")