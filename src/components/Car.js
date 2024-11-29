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
    const {bodyWheel, actions} = useAnimations(animations)
    const orbitControlRef = useRef();


    const WheelJoint = ({
                            body,
                            wheel,
                            bodyAnchor,
                            wheelAnchor,
                            rotationAxis
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

            const position = body.current?.translation();
            const angularVelocity = body.current?.angvel()
            const angularVelocityWheel = wheel.current?.angvel()
            const rotation = wheel.current?.rotation()
            const rotationBody = body.current?.rotation()
            if (joint.current) {
                joint.current.configureMotorVelocity(forward ? -15 : backward ? 15 : 0, 10);
            }
               body.current?.setAngvel({
               x: angularVelocity.x, // Сохраняем скорость по X
             y: leftward ? 1 : rightward ? -1 : 0, // Обновляем скорость по Y
              z: angularVelocity.z  // Сохраняем скорость по Z
               });
            //  bodyWheel.current.position.x = position.x
            //   bodyWheel.current.position.y = position.y + 1
            //   bodyWheel.current.position.z = position.z


            //  bodyWheel.current.rotation.z -= angularVelocity.y * delta / 2.028
            //  wheelM.current.rotation.z = rotation.z
            //  wheelM.current.rotation.x = rotation.x
            // wheelM.current.rotation.y = rotation.y
            // wheelM.current.rotation.y += 0.1


        });

        return null;
    };


    const bodyRef = useRef(null);
    //  const bodyWheel = useRef();
    const wheelPositions = [
        [1.55, -1, -2.7],
        [-1.75, -1, -2.7],
        [1.4, -1, 2.2],
        [-1.4, -1, 2.2],

    ];
    const wheelRefs = useRef(
        wheelPositions.map(() => createRef())
    );

    const platform = useRef();

    const wheelRight = useRef();
    const wheelLeft = useRef();


    useEffect(() => {


        console.log(nodes)
    }, [])
    useFrame((state, delta, frame) => {
        const {forward, backward, leftward, rightward, jump} = get();
        if (forward || backward || leftward || rightward) {
            wheelLeft.current?.wakeUp()
        }


    })

    return (
        <group scale={2}>

            <RigidBody colliders="cuboid" mass={100} ref={bodyRef} type="dynamic">
                <mesh geometry={nodes.Body.geometry} material-color={"blue"} material={materials["car.002"]}/>
            </RigidBody>


            {wheelPositions.map((wheelPosition, index) => (
                <RigidBody
                    position={wheelPosition}
                    colliders="hull"
                    type="dynamic"

                    key={index}
                    ref={wheelRefs.current[index]}

                >
                    {index === 0 ?
                        <mesh scale={[2, 1, 1]} geometry={nodes.front_left_wheel.geometry} material-color={"black"}
                              material={materials["car.002"]}/> :
                        index === 1 ?
                            <mesh scale={[2, 1, 1]} geometry={nodes.front_right_wheel.geometry} material-color={"black"}
                                  material={materials["car.002"]}/> :
                            index === 2 ? <mesh scale={[1.4, 1, 1]} geometry={nodes.rear_right_wheel.geometry}
                                                material-color={"black"}
                                                material={materials["car.002"]}/> : index === 3 ?
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
                />
            ))}


            <OrbitControls/>
        </group>
    );

}