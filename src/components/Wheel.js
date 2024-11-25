import {useFrame, useStore} from "@react-three/fiber";
import {
    Box,
    CameraControls,
    OrbitControls,
    PerspectiveCamera,
    Shape,
    useGLTF,
    useKeyboardControls
} from "@react-three/drei";
import Controller from "ecctrl";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {db} from "./Database";
import {useSelector} from "react-redux";
import {BallCollider, RigidBody} from "@react-three/rapier";
import {routable} from "../actions";

export default function Wheel(props) {
    const [, get] = useKeyboardControls();

    const ref = useRef(); // Ссылка на визуальное колесо
    const body = useRef(); // Ссылка на физическое тело
    const box = useRef(); // Ссылка на физическое тело
    const [speed, setSpeed] = useState(1);
    const [control, setControl] = useState(50);
    const [friction, setFriction] = useState(1);
    const selectResize = useSelector((state) => state.resize.value)
    const [mass, setMass] = useState(0.5);
    const restart = useSelector((state) => state.restart.value);
    const pause = useSelector((state) => state.pause.value);
    const {scene} = useGLTF(props.url?props.url:"./asset/model/wheel-tree.glb");



    const previousAngle = useRef(0); // Хранение предыдущего угла камеры
    const rotationSpeed = useRef(0);
    useEffect(() => {
        if (props.speed) setSpeed(props.speed);
        if (props.control) setControl(props.control);
        if (props.friction) setFriction(props.friction);
        if (props.mass) setMass(props.mass);

    }, [props]);

    useEffect(() => {
        if (body.current) {
            db.friends
                ?.where("name")
                .startsWithAnyOfIgnoreCase(["position"])
                .first()
                .then((rez) => {
                  //  if (rez) body.current?.setTranslation({x: rez.x, y: rez.y, z: rez.z});
                });
        }
    }, []);

    useEffect(() => {
        setCameraOffset(new THREE.Vector3(0, 5 + selectResize / 5, -(10 + selectResize / 5)))
    }, [selectResize]);



    const [wheelDirection, setWheelDirection] = useState(0); // Угол направления колеса
    const [cameraOffset, setCameraOffset] = useState(new THREE.Vector3(0, 5 + selectResize / 5, -(10 + selectResize / 5))); // Смещение камеры
    const pushForce = 1; // Сила толкания
    const turnSpeed = 1; // Скорость поворота
    const wheelRadius = 1; // Радиус колеса

    useFrame((state, delta) => {
        const {forward, backward, leftward, rightward, jump} = get();
        if (forward || backward || leftward || rightward) {

        }

        if (body.current) {

            const wheelPosition = body.current?.translation();
            const angularVelocity = body.current?.angvel()

            if (leftward) setWheelDirection((prev) => prev + turnSpeed * delta); // Поворот влево
            if (rightward) setWheelDirection((prev) => prev - turnSpeed * delta); // Поворот вправо

            const direction = new THREE.Vector3(
                Math.sin(wheelDirection), // X-компонента
                0, // Y не изменяется
                Math.cos(wheelDirection) // Z-компонента
            );

            const currentQuaternion = body.current.rotation();

// Создаем новый кватернион только для вращения по оси Y
            const newQuaternionY = new THREE.Quaternion();
            newQuaternionY.setFromEuler(new THREE.Euler(0, wheelDirection, 0));

// Объединяем текущий кватернион с новым (умножение кватернионов)
            const finalQuaternion = newQuaternionY.multiply(currentQuaternion);

// Устанавливаем итоговый кватернион
            body.current.setRotation(finalQuaternion);


            body.current?.setAngvel({
                x: angularVelocity.x, // Сохраняем скорость по X
                y: leftward ? (turnSpeed * 2)  : rightward ? -(turnSpeed * 2): 0, // Обновляем скорость по Y
                z: angularVelocity.z  // Сохраняем скорость по Z
            });


            const cameraTargetPosition = new THREE.Vector3(
                wheelPosition.x + cameraOffset.x * Math.cos(wheelDirection) - cameraOffset.z * Math.sin(-wheelDirection),
                wheelPosition.y + cameraOffset.y,
                wheelPosition.z + cameraOffset.x * Math.sin(wheelDirection) + cameraOffset.z * Math.cos(wheelDirection)
            );

            state.camera.position.lerp(cameraTargetPosition, 0.1);

            // Камера смотрит на колесо
            state.camera.lookAt(wheelPosition.x, wheelPosition.y, wheelPosition.z);



        }
    });



    return (
        <>
            <Controller
                {...props}

                maxVelLimit={speed}
                ref={body}
                mass={mass}
                camInitDir={{x: 0.5, y: 0}}
                mode={"FixedCamera"}
                friction={friction}
                camUpLimit={5}
                camInitDis={-20}
                colliders={"hull"}
                disableFollowCam={true}
            >
                <primitive castShadow receiveShadow object={scene} ref={ref} scale={[0.3,0.3,0.3]} />
                <BallCollider onIntersectionEnter={(e)=>{
                       console.log(e.rigidBodyObject.children.filter((el)=>el.name))
                }} args={[0.5,0.5]} sensor={true} position={[0,0,0]} />
            </Controller>

        </>
    );
}
