import {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {RigidBody} from "@react-three/rapier";
import {useGLTF, useKeyboardControls} from "@react-three/drei";
import {routable} from "../actions";


export default function Ball(props) {
    const ref = useRef();
    const cameraAngle = useRef(routable(-90)); // Угол вращения камеры вокруг персонажа
    const [, get] = useKeyboardControls();

    const {scene} = useGLTF(props.url ? props.url : "./asset/model/wheel-tree.glb");

    const [speed] = useState(5); // Скорость движения персонажа
    const [rotationSpeed] = useState(0.1); // Скорость поворота персонажа
    const cameraRadius = 6; // Радиус вращения камеры
    const cameraHeight = 5; // Высота камеры над персонажем

    // Вектора движения
    const forwardVector = new THREE.Vector3(0, 0, -1);
    const rightVector = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3();

    useFrame((state, delta) => {
        const {forward, backward, leftward, rightward} = get();

        if (!ref.current) return;

        // Получение текущей позиции персонажа
        const position = ref.current.translation();



        // Управление вращением камеры
        if (leftward) cameraAngle.current -= delta; // Поворачиваем влево
        if (rightward) cameraAngle.current += delta; // Поворачиваем вправо

        // Вычисляем новую позицию камеры
        const cameraX = position.x + cameraRadius * Math.cos(cameraAngle.current);
        const cameraZ = position.z + cameraRadius * Math.sin(cameraAngle.current);
        const cameraY = position.y + cameraHeight;

        // Устанавливаем камеру на рассчитанную позицию
        state.camera.position.set(cameraX, cameraY, cameraZ);

        // Камера смотрит на персонажа
        state.camera.lookAt(position.x, position.y, position.z);
    });

    return (
        <RigidBody
            ref={ref}
            colliders="hull"
            scale={0.3}
            friction={1}
            mass={0.5}
            type="dynamic"
            position={[0, 3, 0]}
        >
            <primitive object={scene} />
        </RigidBody>
    );
}
