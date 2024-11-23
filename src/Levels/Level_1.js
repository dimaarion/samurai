import {routable} from "../actions";
import {RigidBody} from "@react-three/rapier";
import {Environment, useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useFrame} from "@react-three/fiber";

export default function Level_1(props) {

    const {nodes, materials, animations} = useGLTF("./asset/model/level1.glb");
    const { ref,actions} = useAnimations(animations)
    const [actionsArray, setActionsArray] = useState([])
    const pause = useSelector((state) => state.pause.value);





    useEffect(() => {
        if (props.actionsArray) {
            setActionsArray(props.actionsArray)
        }
       // console.log(nodes)
    }, [])

    useEffect(() => {


        if(actions["coinRAction"]){
            actions["coinRAction"].play()
        }






    }, [])


    useFrame((state, delta) => {


    })

    return <>
        <Environment preset="city"/>
        <group {...props} ref={ref} rotation={[0, 0, 0]} scale={0.3} position={[0, 0, 0]}>
            <RigidBody  colliders="trimesh" type="fixed">
                <primitive castShadow receiveShadow object={nodes.road} name={"road"}/>
            </RigidBody>
            <RigidBody colliders="trimesh" type="fixed">
                <primitive castShadow receiveShadow object={nodes.fence} name={"fence"}/>
            </RigidBody>

            <group  name={"coin"} >
                <primitive  object={nodes.coinR} />
                <skinnedMesh castShadow receiveShadow geometry={nodes.coin.geometry} material={materials["bg.001"]} skeleton={nodes.coin.skeleton} />

            </group>
            <primitive   object={nodes.box_rek} name={"box_rek"}/>
            <primitive   object={nodes.start} name={"start"}/>
            <primitive   object={nodes.post} name={"post"}/>
            <primitive   object={nodes.op} name={"op"}/>
        </group>
    </>
}