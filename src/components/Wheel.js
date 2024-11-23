import {useFrame, useStore} from "@react-three/fiber";
import {Box, Shape, useGLTF, useKeyboardControls} from "@react-three/drei";
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
    const [url, setUrl] = useState(props.url ? props.url : "./asset/model/wheel-tree.glb");
    const [mass, setMass] = useState(0.5);
    const restart = useSelector((state) => state.restart.value);
    const pause = useSelector((state) => state.pause.value);
    const {scene} = useGLTF(props.url?props.url:"./asset/model/wheel-tree.glb");
    const previousRotationY = useRef(0); // Хранение предыдущего угла поворота камеры
    const angularVelocityY = useRef(0); // Хранение угловой скорости по оси Y


    useEffect(() => {
        if (props.speed) setSpeed(props.speed);
        if (props.control) setControl(props.control);
        if (props.friction) setFriction(props.friction);
        if (props.mass) setMass(props.mass);
        if (props.url) setUrl(props.url);
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

let speedControl = control
    useFrame((state, delta) => {
        const {forward, backward, leftward, rightward, jump} = get();
        if (forward || backward || leftward || rightward) {

        }

        if (body.current) {
            // Получаем текущий угол поворота камеры вокруг оси Y
            const cameraRotation = state.camera.rotation;
            const wheelRotation = body.current?.rotation();
            const angularVelocity = body.current?.angvel()
            const wheelPosition = body.current?.translation()







            body.current?.setAngvel({
                x: angularVelocity.x, // Сохраняем скорость по X
                y: leftward ? speedControl :rightward ? -speedControl : 0, // Обновляем скорость по Y
                z: angularVelocity.z  // Сохраняем скорость по Z
            });

        }
    });



    return (
        <>
            <Controller
                {...props}
                disableFollowCam={pause}
                maxVelLimit={speed}
                ref={body}
                mass={mass}
                camInitDir={{x: 0.5, y: 0}}
                mode={"FixedCamera"}
                friction={friction}
                camUpLimit={5}
                camInitDis={-20}
                colliders={"hull"}
                camMoveSpeed={0}
            >
                <primitive castShadow receiveShadow object={scene} ref={ref} scale={[0.3,0.3,0.3]} />
                <BallCollider onIntersectionEnter={(e)=>{
console.log(e.rigidBodyObject.children.filter((el)=>el.name))
                }} args={[0.5,0.5]} sensor={true} position={[0,0,0]} />
            </Controller>

        </>
    );
}
