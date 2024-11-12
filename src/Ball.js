import {Box, Shape, Sphere, Torus, useKeyboardControls} from "@react-three/drei";
import {Physics, RigidBody, CuboidCollider, useRapier, CapsuleCollider, BallCollider} from "@react-three/rapier";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import {routable} from "./actions";

const SPEED = 50;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

export default function Ball(props) {
    const [, get] = useKeyboardControls();
    const ref = useRef();
    const rapier = useRapier();
    const cameraRef = useRef();

    const rotationSpeed = 0.1;

    useFrame((state) => {
        const {forward, backward, left, right, jump} = get();
        const velocity = ref.current.linvel();
        // update camera
        //  state.camera.position.set(...ref.current.translation());

        frontVector.set(backward - forward, 0, 0);
        sideVector.set(0, 0, right - left);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation);
        //  ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
        ref.current.setAngvel({x: direction.x, y: direction.y, z: direction.z})
        // ref.current.rotation.x = 10
        // jumping
        const world = rapier.world.raw();
        const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), {x: 0, y: -1, z: 0}));
        const grounded = ray && ray.collider && Math.abs(ray.toi) <= 2;

        if (jump && grounded) ref.current.setLinvel({x: 0, y: 7.5, z: 0});

        const targetPosition = ref.current.translation();
        // Обновляем позицию камеры на основе позиции персонажа
        state.camera.position.lerp(
            {
                x: targetPosition.x,
                y: targetPosition.y + 10, // Задаем высоту камеры над персонажем
                z: targetPosition.z + 25, // Расстояние камеры за персонажем
            },
            0.1 // Скорость следования камеры
        );

        // Устанавливаем камеру, чтобы она смотрела на персонажа
        state.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);

    });


    return (
        <RigidBody ref={ref} colliders={"ball"} type="dynamic" restitution={0}>
            <Sphere>
                <meshStandardMaterial color="hotpink"/>
            </Sphere>

            <BallCollider args={[0.8]} sensor={true} />
            <perspectiveCamera ref={cameraRef} fov={75}/>
        </RigidBody>
    )
}