import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useKeyboardControls } from "@react-three/drei";

export default function RollingWheelWithCamera(props) {
    const wheelRef = useRef(); // Ссылка на колесо
    const cameraRef = useRef(); // Ссылка на камеру
    const [, get] = useKeyboardControls(); // Для управления клавишами
    const [wheelDirection, setWheelDirection] = useState(0); // Угол направления колеса
    const [cameraOffset] = useState(new THREE.Vector3(0, 5, -10)); // Смещение камеры
    const pushForce = 5; // Сила толкания
    const turnSpeed = 1.5; // Скорость поворота
    const friction = 0.1; // Трение для замедления колеса
    const wheelRadius = 1; // Радиус колеса

    useFrame((state, delta) => {
        if (!wheelRef.current) return;

        const { forward, backward, leftward, rightward } = get();

        // Получаем текущую позицию и вращение колеса
        const wheelPosition = wheelRef.current.translation();
        const wheelRotation = wheelRef.current.rotation();

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

        // Рассчитываем, сколько колеса должно повернуться на каждый импульс


        const linearVelocity = wheelRef.current.linvel(); // Линейная скорость
        const linearSpeed = linearVelocity.length(); // Модуль линейной скорости

        // Расчет угловой скорости: линейная скорость / радиус колеса
        const angularSpeed = linearSpeed / wheelRadius;

        // Применяем угловую скорость к колесу
        wheelRef.current.setAngvel(new THREE.Vector3(0, 0, angularSpeed)); // Вращение только по оси Y


        // Камера следит за колесом
        const cameraTargetPosition = new THREE.Vector3(
            wheelPosition.x + cameraOffset.x * Math.cos(wheelDirection) - cameraOffset.z * Math.sin(wheelDirection),
            wheelPosition.y + cameraOffset.y,
            wheelPosition.z + cameraOffset.x * Math.sin(wheelDirection) + cameraOffset.z * Math.cos(wheelDirection)
        );

        // Плавное перемещение камеры
        state.camera.position.lerp(cameraTargetPosition, 0.1);

        // Камера смотрит на колесо
        state.camera.lookAt(wheelPosition.x, wheelPosition.y, wheelPosition.z);
    });

    return (
        <RigidBody
            ref={wheelRef}
            colliders="hull"
            type="dynamic"
            position={[0, 1, 0]}
            friction={friction}
            restitution={0.5}
        >
            <mesh>
                <cylinderGeometry args={[1, 1, 0.5, 32]} /> {/* Колесо */}
                <meshStandardMaterial color="blue" />
            </mesh>
        </RigidBody>
    );
}
