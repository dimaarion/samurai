import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {CylinderCollider, RigidBody} from "@react-three/rapier";
import * as THREE from "three";
import {useGLTF, useKeyboardControls} from "@react-three/drei";
import Controller from "ecctrl";
import {MathUtils} from "three";

export default function RollingWheel(props) {
    const wheelRef = useRef(); // Ссылка на колесо
    const cameraRef = useRef(); // Ссылка на камеру
    const [, get] = useKeyboardControls(); // Для управления клавишами
    const [wheelDirection, setWheelDirection] = useState(0); // Угол направления колеса
    const [cameraOffset] = useState(new THREE.Vector3(0, 5, -10)); // Смещение камеры
    const pushForce = 1; // Сила толкания
    const turnSpeed = 1.5; // Скорость поворота
    const wheelRadius = 1; // Радиус колеса

    const {scene} = useGLTF(props.url?props.url:"./asset/model/wheel-tree.glb");
    useFrame((state, delta) => {
        if (!wheelRef.current) return;

        const { forward, backward, leftward, rightward } = get();

        // Получаем текущую позицию и вращение колеса
        const wheelPosition = wheelRef.current.translation();

        // Управление поворотом
        if (leftward) setWheelDirection((prev) => prev + turnSpeed * delta); // Поворот влево
        if (rightward) setWheelDirection((prev) => prev - turnSpeed * delta); // Поворот вправо

        // Рассчитываем вектор направления движения
        const direction = new THREE.Vector3(
            Math.sin(wheelDirection), // X-компонента
            0, // Y не изменяется
            Math.cos(wheelDirection) // Z-компонента
        );


        // Применяем силу для движения
        if (forward) wheelRef.current.applyImpulse(direction.clone().multiplyScalar(pushForce), true);
        if (backward) wheelRef.current.applyImpulse(direction.clone().multiplyScalar(-pushForce), true);

        // Поворот колеса
        const wheelQuaternion = new THREE.Quaternion();
        wheelQuaternion.setFromEuler(new THREE.Euler(0, wheelDirection, 0));
        wheelRef.current.setRotation(wheelQuaternion);





        // Расчет положения камеры
        const cameraTargetPosition = new THREE.Vector3(
            wheelPosition.x + cameraOffset.x * Math.cos(wheelDirection) - cameraOffset.z * Math.sin(-wheelDirection),
            wheelPosition.y + cameraOffset.y,
            wheelPosition.z + cameraOffset.x * Math.sin(wheelDirection) + cameraOffset.z * Math.cos(wheelDirection)
        );



        // Плавное перемещение камеры
        state.camera.position.lerp(cameraTargetPosition, 0.1);

        // Камера смотрит на колесо
        state.camera.lookAt(wheelPosition.x, wheelPosition.y, wheelPosition.z);
    });

    return (<>
            <RigidBody
                ref={wheelRef}
                colliders="hull"
                type="dynamic"
                position={[0, 3, 0]}
                friction={10}
                restitution={0.5}
            >

                <primitive castShadow receiveShadow object={scene}  scale={[0.3,0.3,0.3]} />
            </RigidBody>

    </>


    );
}
