import { useFrame } from "@react-three/fiber";
import {useEffect, useRef, useState} from "react";
import {RigidBody, useRevoluteJoint} from "@react-three/rapier";
import {useGLTF, useKeyboardControls} from "@react-three/drei";
import * as THREE from "three";
import {MathUtils} from "three";
import {routable} from "../actions";

export default function Car2(props) {
    const body = useRef(); // Ссылка на физическое тело машины
    const rear_right_wheel = useRef();
    const rear_left_wheel = useRef();
    const front_right_wheel = useRef();
    const front_left_wheel = useRef();
    const [speed, setSpeed] = useState(0); // Текущая скорость машины
    const [steeringAngle, setSteeringAngle] = useState(0); // Угол поворота руля
    const [carDirection, setCarDirection] = useState(0); // Текущее направление машины
    const maxSpeed = 40; // Максимальная скорость
    const acceleration = 10; // Ускорение
    const brakingForce = 2; // Сила торможения
    const turnSpeed = 0.1; // Скорость поворота руля
    const friction = 5; // Замедление без нажатия клавиш
    const {nodes, materials, animations} = useGLTF('./asset/model/car.glb');

    const [, get] = useKeyboardControls(); // Подключение клавиатурных контролов

const jointRear_right_wheelBody = useRevoluteJoint(body,rear_right_wheel,[
    [0,-1,-2.1],
    [0,0,0],
    [1,0,0]
])
    const jointRear_left_wheelBody = useRevoluteJoint(body,rear_left_wheel,[
        [0,-1,-2.1],
        [0,0,0],
        [1,0,0]
    ])

    const jointFront_right_wheelBody = useRevoluteJoint(body,front_right_wheel,[
        [0,-1.1,2.7],
        [0,0,0],
        [1,0,0]
    ])
    const jointFront_left_wheelBody = useRevoluteJoint(body,front_left_wheel,[
        [0,-1.1,2.75],
        [0,0,0],
        [1,0,0]
    ])
    const cameraOffset = new THREE.Vector3(0, 5, -15); // Камера выше и позади машины
    useFrame((state, delta) => {
        if (!body.current) return;

        // Получение состояния клавиш
        const { forward, backward, leftward, rightward } = get();
        if (forward || backward || leftward || rightward) {
            body.current?.wakeUp()
        }
        const velocity = body.current.linvel(); // Получение текущей скорости тела

        // Управление скоростью
        if (forward) {
            setSpeed((prev) => Math.min(prev + acceleration * delta, maxSpeed));
        } else if (backward) {
            setSpeed((prev) => Math.max(prev - brakingForce * delta, -maxSpeed / 2));
        } else {
            setSpeed((prev) => prev * (1 - friction * delta));
        }

        // Управление углом поворота руля
        if (leftward) {
            setSteeringAngle((prev) =>
                Math.max(prev - turnSpeed * delta, -Math.PI / 4)
            ); // Поворот влево
        } else if (rightward) {
            setSteeringAngle((prev) =>
                Math.min(prev + turnSpeed * delta, Math.PI / 4)
            ); // Поворот вправо
        } else {
            setSteeringAngle((prev) => prev * (1 - delta * 5)); // Возврат руля в нейтральное положение
        }

        // Обновление направления машины
        if (speed !== 0) {
            setCarDirection((prev) => prev + steeringAngle * delta * speed * 0.05);
        }

        // Вычисление нового направления движения машины
        const direction = new THREE.Vector3(
            Math.sin(carDirection),
            0,
            Math.cos(carDirection)
        ).normalize();

        // Применение скорости и направления к физическому телу

       // body.current.setLinvel({
        //    x: direction.x * speed,
         //   y: velocity.y,
         //   z: direction.z * speed,
       // });
if(forward || backward){
    body.current?.setAngvel({
        x:body.current?.angvel().x,
        y:-steeringAngle * 2,
        z:body.current?.angvel().z
    })
}

        jointRear_right_wheelBody.current.configureMotorVelocity(speed,30)
        jointRear_left_wheelBody.current.configureMotorVelocity(speed,30)
        jointFront_right_wheelBody.current.configureMotorVelocity(speed,30)
        jointFront_left_wheelBody.current.configureMotorVelocity(speed,30)

        // Управление камерой
        const carPosition = body.current.translation(); // Позиция машины
        const carRotation = body.current.rotation(); // Текущее вращение машины в кватернионах

        // Вычисление позиции камеры относительно машины

        const rotatedOffset = cameraOffset.clone().applyQuaternion(carRotation); // Учитываем поворот машины

        // Позиция камеры
        const cameraPosition = new THREE.Vector3(
            carPosition.x + rotatedOffset.x,
            carPosition.y + rotatedOffset.y,
            carPosition.z + rotatedOffset.z
        );

        // Плавное перемещение камеры

           state.camera.position.lerp(cameraPosition, 0.1);



        // Камера всегда смотрит на машину
        state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
    });

    useEffect(()=>{
        Object.values(materials).forEach((material) => {
            material.transparent = false; // Убираем прозрачность
            material.opacity = 1;        // Полностью непрозрачный
            material.needsUpdate = true; // Принудительное обновление
        });
        console.log(nodes)
    },[])


    return (
        <>
        <group scale={2} >
            <RigidBody
                ref={body}
                colliders="cuboid"
                type="dynamic"
                friction={1}
                restitution={0.5}
                mass={1}
                angularDamping={10}
                linearDamping={1}
                {...props}
                args={[0.5,0.5,0.5]}
            >
                {/* Визуальное представление машины */}
                <group>
                    <mesh geometry={nodes.Body.geometry} material={materials['Материал']} rotation={[0,routable(180),0]} castShadow receiveShadow />
                    <mesh geometry={nodes.engine.geometry}  material={materials['engine.001']} position={[0,0,1]}  rotation={[0,routable(180),0]} castShadow receiveShadow />
                    <mesh geometry={nodes.engine_part.geometry} material={materials['engine.001']} position={[0.17,0.05,1.35]}  rotation={[0,routable(180),0]} castShadow receiveShadow />
                    <mesh geometry={nodes.engine_part001.geometry} material={materials['engine.001']} position={[0,-0.1,1.35]}  rotation={[0,routable(180),0]} castShadow receiveShadow />
                    <mesh geometry={nodes.engine_part002.geometry} material={materials['engine.001']} position={[0,0.13,1.44]}  rotation={[0,routable(180),0]} castShadow receiveShadow />
                </group>


            </RigidBody>
            <RigidBody type={"dynamic"} colliders={"hull"} friction={props.friction} ref={rear_right_wheel}>
                    <mesh geometry={nodes.rear_right_wheel.geometry} material={materials['Материал.001']}  position={[-0.7,0,0]} rotation={[0,routable(180),0]} castShadow receiveShadow />

            </RigidBody>
            <RigidBody type={"dynamic"} colliders={"hull"} friction={props.friction} ref={rear_left_wheel}>
                <mesh geometry={nodes.rear_left_wheel.geometry} material={materials['Материал.001']}  position={[0.72,0,0]} rotation={[0,routable(180),0]} castShadow receiveShadow />

            </RigidBody>
            <RigidBody type={"dynamic"} colliders={"hull"} friction={props.friction} ref={front_right_wheel}>
                <mesh geometry={nodes.front_right_wheel.geometry} material={materials['Материал.001']}  position={[-0.75,0,0]} rotation={[0,routable(180),0]} castShadow receiveShadow />

            </RigidBody>
            <RigidBody type={"dynamic"} colliders={"hull"} friction={props.friction} ref={front_left_wheel}>
                <mesh geometry={nodes.front_left_wheel.geometry} material={materials['Материал.001']}  position={[0.8,0,0]} rotation={[0,routable(180),0]} castShadow receiveShadow />
            </RigidBody>
             </group>
        </>
    );
}