import {quat, RigidBody, useFixedJoint, useRevoluteJoint, useSphericalJoint, vec3} from "@react-three/rapier";
import {routable} from "../actions";
import {Box, Gltf, Shape, Sphere, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import Ball from "../Ball";
import * as THREE from "three";


const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function Player(props) {
    const {nodes, materials} = useGLTF("./asset/model/wheel-tree.glb");
//    console.log(nodes)
    const bas = useRef();
    const wheel = useRef();
    const ref = useRef();
    const [, get] = useKeyboardControls();
    const [controls, setControls] = useState({
        forward: false,
        backward: false,
        leftward: false,
        rightward: false,
        jump: false
    })
    const speed = 5;


    const joint = useRevoluteJoint(wheel, ref, [
        // Position of the joint in bodyA's local space
        [0, 0, 0],
        // Position of the joint in bodyB's local space
        [0, 0, 0],
        [1, 0, 0]
    ]);

    useFrame((state, delta) => {
        const {forward, backward, leftward, rightward, jump} = get();
        if (forward || backward || leftward || rightward) {
            wheel.current?.wakeUp()
        }
        let targetPosition = wheel.current?.translation();
        ref.current?.setTranslation(targetPosition)
        if (forward) {
         //   wheel.current?.setAngvel({x: -speed, y: 0, z: 0})
          //  joint.current.configureMotorVelocity(5, 3);
          //  joint.current.configureMotorPosition(50, 2, 2)
            joint.current.configureMotor(10, 5, 2, 2)
state.camera.rotation.set(vec3(ref.current?.rotation()))
        }else if(backward){
            wheel.current?.setLinvel({x: speed, y: 0, z: 0})
        }
        if (leftward) {
            ref.current?.setAngvel({x: 0, y: -speed, z: 0})

        }else if(rightward){
            ref.current?.setAngvel({x: 0, y: speed, z: 0})
        }else {
            ref.current?.setAngvel({x: 0, y: 0, z: 0})
        }

        if (joint.current) {

        }
        //   let targetPosition = ref.current?.translation();
        //   state.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z)

        const rotation = new THREE.Euler()
      //  state.camera.rotation.set()
    })




    return <>
        <RigidBody ref={wheel} scale={5} position={[0, 1, -40]} colliders="trimesh" type={"dynamic"} >
            <mesh geometry={nodes.AnimateWheel.geometry} material={materials["mat"]}/>
        </RigidBody>
        <RigidBody ref={ref} scale={[5,0.5,0.5]}  rotation={[0,routable(0),0]} colliders="cuboid" friction={0} type={"kinematicVelocity"} >
            <Box>
                <meshStandardMaterial color={"red"} />
            </Box>
        </RigidBody>
        <RigidBody ref={bas} scale={5}   colliders="cuboid"  type={"dynamic"} >
            <Box>
                <meshStandardMaterial color={"blue"} />
            </Box>
        </RigidBody>
    </>
}