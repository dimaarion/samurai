import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {RigidBody} from "@react-three/rapier";
import {useGLTF, useKeyboardControls} from "@react-three/drei";

export default function Ball_3(props) {
    const ref = useRef();
    const cameraAngle = useRef(-Math.PI / 2); // Угол вращения камеры вокруг персонажа (начальный угол -90 градусов)
    const [, get] = useKeyboardControls();

    const {scene} = useGLTF(props.url ? props.url : "./asset/model/wheel-tree.glb");

    const [speed] = useState(5); // Скорость движения персонажа
    const [rotationSpeed] = useState(1); // Скорость поворота камеры и персонажа
    const cameraRadius = 6; // Радиус вращения камеры
    const cameraHeight = 5; // Высота камеры над персонажем

    const impulseStrength = 0.5; // Сила импульса для движения

    useEffect(() => {


    }, []);


    useFrame((state, delta) => {
        const {forward, backward, leftward, rightward} = get();
        if (forward || backward || leftward || rightward) {
            ref.current?.wakeUp()
        }
        if (!ref.current) return;

        const mass = ref.current?.mass();
        const gravity = ref.current?.gravityScale(); // значение гравитации (если стандартное)
        const normalForce = (0.15 + (1 / 4.5));
     //   console.log(normalForce)

        // Получение текущей позиции персонажа
        const position = ref.current.translation();

        // Управление вращением камеры и персонажа
        if (leftward) cameraAngle.current -= rotationSpeed * delta ; // Поворот камеры влево
        if (rightward) cameraAngle.current += rotationSpeed * delta ; // Поворот камеры вправо

        // Синхронизация поворота персонажа с камерой
        const quaternion = new THREE.Quaternion();
       // quaternion.setFromEuler(new THREE.Euler(0, -(cameraAngle.current -Math.PI / 2 ), 0)); // Поворот только по оси Y

ref.current?.setAngvel({
    x:ref.current?.angvel().x,
    y:leftward ? rotationSpeed + normalForce : rightward ? -(rotationSpeed + normalForce): 0,
    z:ref.current?.angvel().z
})
console.log(ref.current?.rotation().y * 10)
        // Движение персонажа
        const direction = new THREE.Vector3();
        if (forward) Math.abs(ref.current?.rotation().y) * 10 < 4?direction.z += 1:direction.z -= 1; // Вперёд
        if (backward) Math.abs(ref.current?.rotation().y) * 10 < 4?direction.z -= 1:direction.z += 1;

        // Преобразуем направление в локальные координаты, основываясь на повороте персонажа
        direction.applyQuaternion(quaternion).normalize();

        // Применяем импульс для движения (реактивное поведение)
        if (forward || backward) {
            const impulse = direction.multiplyScalar(impulseStrength);
            ref.current.applyImpulse(impulse, true); // Применение импульса к центру тела
        }

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
            restitution={0.2} // Отскок при столкновениях
            linearDamping={0.5} // Уменьшение скорости со временем
            angularDamping={0.5} // Уменьшение вращения со временем
        >
            <primitive object={scene} />
        </RigidBody>
    );
}
