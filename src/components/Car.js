import {createRef, useEffect, useRef, useState} from "react";
import {CuboidCollider, RigidBody, useFixedJoint, useRevoluteJoint} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";
import {Box, Cylinder, OrbitControls, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {Vector3} from "three";
import Controller from "ecctrl";
import {routable} from "../actions";
import * as THREE from "three";

const directionVector = new Vector3();

export default function Car(props) {
    const [, get] = useKeyboardControls();
    const {nodes, materials, animations} = useGLTF('./asset/model/VintageRacingCar.glb');

    const WheelJoint = ({
                            body,
                            wheel,
                            bodyAnchor,
                            wheelAnchor,
                            rotationAxis,
        index
                        }) => {
        const joint = useRevoluteJoint(body, wheel, [
            bodyAnchor,
            wheelAnchor,
            rotationAxis
        ]);
        const [cameraOffset, setCameraOffset] = useState(new THREE.Vector3(0, 10, -20));
        useFrame((state, delta) => {
            const {forward, backward, leftward, rightward, jump} = get();
            if (forward || backward || leftward || rightward) {
                body.current?.wakeUp()
            }

            if (joint.current) {
                joint.current.configureMotorVelocity(forward ? -25 : backward ? 25 : 0, 10);
            }

        });

        return null;
    };

    const bodyRef = useRef(null);
    //  const bodyWheel = useRef();
    const wheelPositions = [
        [1.4, -1, 2.2],
        [-1.4, -1, 2.2],

    ];
    const wheelRefs = useRef(
        wheelPositions.map(() => createRef())
    );

    const platform = useRef();

    const wheelRight = useRef();
    const wheelLeft = useRef();




    const platformWheelJoint = useRevoluteJoint(bodyRef,wheelRight,[
        [0,-1.2,-2.8],
        [0,0,0],
        [1,0,0]
    ])
    const platformWheelLeftJoint = useRevoluteJoint(bodyRef,wheelLeft,[
        [0,-1.2,-2.8],
        [0,0,0],
        [1,0,0]
    ])


    useFrame((state, delta, frame) => {
        const {forward, backward, leftward, rightward, jump} = get();
        if (forward || backward || leftward || rightward) {
            wheelLeft.current?.wakeUp()
        }
        if (platformWheelJoint.current) {
            platformWheelJoint.current.configureMotorVelocity(leftward ? 30 : rightward ? -30: 0, 10);
            platformWheelLeftJoint.current.configureMotorVelocity(leftward ? -30 : rightward ? 30 : 0, 10);
        }

    })

    return (
        <group scale={2}>

            <RigidBody colliders="cuboid" ref={bodyRef} type="dynamic">
                <mesh geometry={nodes.Body.geometry} material-color={"blue"} material={materials["car.002"]}/>
            </RigidBody>

            <RigidBody   colliders="hull" ref={wheelRight} type="dynamic">
                <mesh position={[-1,0,0]}  scale={[1.8, 1, 1]} geometry={nodes.front_right_wheel.geometry}
                      material-color={"black"}
                      material={materials["car.002"]}/>
            </RigidBody>
            <RigidBody  colliders="hull" ref={wheelLeft} type="dynamic">
                <mesh position={[1,0,0]} scale={[1.8, 1, 1]} geometry={nodes.front_left_wheel.geometry}
                      material-color={"black"}
                      material={materials["car.002"]}/>
            </RigidBody>
            {wheelPositions.map((wheelPosition, index) => (
                <RigidBody
                    position={wheelPosition}
                    colliders="hull"
                    type="dynamic"
                    key={index}
                    ref={wheelRefs.current[index]}

                >
                    {index === 0 ? <mesh scale={[1.4, 1, 1]} geometry={nodes.rear_right_wheel.geometry}
                                                material-color={"black"}
                                                material={materials["car.002"]}/> : index === 1 ?
                                <mesh scale={[1.4, 1, 1]} geometry={nodes.rear_left_wheel.geometry}
                                      material-color={"black"}
                                      material={materials["car.002"]}/> : ""}

                </RigidBody>
            ))}
            {wheelPositions.map((wheelPosition, index) => (
                <WheelJoint
                    key={index}
                    body={bodyRef}
                    wheel={wheelRefs.current[index]}
                    bodyAnchor={wheelPosition}
                    wheelAnchor={[0, 0, 0]}
                    rotationAxis={[1, 0, 0]}
                    index={index}
                />
            ))}


            <OrbitControls/>
        </group>
    );

}