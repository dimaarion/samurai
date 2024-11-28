import {createRef, useEffect, useRef, useState} from "react";
import {CuboidCollider, RigidBody, useRevoluteJoint} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";
import {Box, Cylinder, OrbitControls, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {Vector3} from "three";
import Controller from "ecctrl";
import {routable} from "../actions";
import * as THREE from "three";

const directionVector = new Vector3();

export default function Car(props) {
    const [, get] = useKeyboardControls();
    const {nodes, materials, animations} = useGLTF("./asset/model/wheel-tree.glb");
    const { bodyWheel ,actions} = useAnimations(animations)
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
        useFrame((state,delta) => {
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
                joint.current.configureMotorVelocity(forward ? 10 : backward ? -10 : 0, 10);
            }
            body.current?.setAngvel({
                x: angularVelocity.x, // Сохраняем скорость по X
                y: leftward ? 2 : rightward ? -2 : 0, // Обновляем скорость по Y
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
        [1.5, 0, 0],
        [-1.5, 0, 0],


    ];
    const wheelRefs = useRef(
        wheelPositions.map(() => createRef())
    );

    useEffect(()=>{
       console.log(actions)
    },[])


    return (
        <group>
            <group >
                <primitive castShadow receiveShadow ref={bodyWheel}  object={nodes.wheel}
                rotation={[routable(90), routable(0), routable(90)]}
                scale={0.5}/>
            </group>

            <RigidBody colliders="cuboid"  ref={bodyRef} type="dynamic">
                <Box scale={[1.5,1.5,5]} position={[0,0,0]}  />
               {/*<primitive castShadow receiveShadow object={nodes.wheel}
                            rotation={[routable(90), routable(0), routable(90)]}
                            scale={0.5}/>*/}

            </RigidBody>

            {wheelPositions.map((wheelPosition, index) => (
                <RigidBody
                    position={wheelPosition}
                    colliders="hull"
                    type="dynamic"
                    key={index}
                    ref={wheelRefs.current[index]}

                >
                    <Cylinder rotation={[routable(90),routable(0),routable(90)]} scale={[1,1,1]} />

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
            <OrbitControls ref={orbitControlRef}/>
        </group>
    );

}