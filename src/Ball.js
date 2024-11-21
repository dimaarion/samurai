import {Box, CameraControls, Gltf, Shape, Sphere, Torus, useGLTF, useKeyboardControls} from "@react-three/drei";
import {Physics, RigidBody, CuboidCollider, useRapier, BallCollider, CapsuleCollider} from "@react-three/rapier";
import {useEffect, useRef, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import {useSelector, useDispatch} from 'react-redux'
import {db} from "./components/Database";
import {routable} from "./actions";
import {incrementSave} from "./reduser/savePosition";
import {MathUtils} from "three";
import {decrementPause, incrementPause} from "./reduser/pause";
import {useLiveQuery} from "dexie-react-hooks";
import {incrementPauseOpen} from "./reduser/pauseOpen";
import {updateMusic} from "./reduser/music";
import Controller from 'ecctrl'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

let SPEED = 10;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3(0, 0, 1); // Вектор вперед
const sideVector = new THREE.Vector3(1, 0, 0); // Вектор в сторону (вправо)



export default function Ball(props) {
    const savePlayerPosition = useSelector((state) => state.savePosition.value)
    const restart = useSelector((state) => state.restart.value)
    const dispatch = useDispatch()
    const [, get] = useKeyboardControls();
    const ref = useRef();
    const rapier = useRapier();
    const cameraRef = useRef();
    const rotate = useRef();
    const [exit, setExit] = useState(false)
    const maxTiltAngle = Math.PI / 4;
    const [speed, setSpeed] = useState(1);
    const [control, setControl] = useState(50);
    const [friction, setFriction] = useState(1);
    const [url, setUrl] = useState("./asset/model/wheel-tree.glb");
    const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0, z: 0});
    const [mass, setMass] = useState(0.5);
    const {nodes, materials} = useGLTF("./asset/model/wheel-tree.glb");


    const [rotationSpeed, setRotationSpeed] = useState(0.05); // Скорость поворота

    const rotation = useRef(0);
    const rotations = new THREE.Quaternion(routable(0), routable(0), routable(0));
    const vector = new THREE.Vector3(0, 0, 2)


    useEffect(() => {
        try {
            db.friends?.where("name").startsWithAnyOfIgnoreCase(["position"]).first().then((rez) => {
                //   console.log(rez)
                ref.current?.setTranslation({x: rez.x, y: rez.y, z: rez.z})
            })

        } catch (e) {

        }
        //  ref.current?.setRotation(rotation,true)
    }, []);


    useEffect(() => {
        if (restart) {
        //    ref.current?.setRotation(rotations, true);
          //  ref.current?.setTranslation({x: savePlayerPosition.x, y: savePlayerPosition.y, z: savePlayerPosition.z});
         //   ref.current?.setAngvel({x: 0, y: 0, z: 0});

        } else {

        }
    }, [restart])

    useEffect(() => {
        if (props.speed) {
            setSpeed(props.speed)
        }
        if (props.control) {
            setControl(props.control)
        }
        if (props.friction) {
            setFriction(props.friction)
        }
        if (props.mass) {
            setMass(props.mass)
        }
        if (props.url) {
            setUrl(props.url)
        }
    }, [])


    useFrame((state,delta) => {
        const {forward, backward, leftward, rightward, jump} = get();
        if (forward || backward || leftward || rightward) {
            ref.current?.wakeUp()
        }
ref.current?.setAngvel({
    x:MathUtils.lerp(ref.current?.angvel().x, forward ? -Math.PI : backward ? Math.PI : 0, delta),
    y:0,
    z:0
})





            if (ref.current) {
            const cameraOffset = new THREE.Vector3(0, 30, 60); // Смещение камеры
            const translation = ref.current.translation(); // Получаем позицию персонажа
            const rotation = ref.current.rotation(); // Получаем кватернион персонажа

            if (translation && rotation) {
                // Преобразуем позицию персонажа в THREE.Vector3
                const targetPosition = new THREE.Vector3(translation.x, translation.y, translation.z);

                // Создаем поворот только вокруг оси Y
                const euler = new THREE.Euler(0, rotation.x, 0); // Ограничиваем вращение оси Y
                const limitedQuaternion = new THREE.Quaternion().setFromEuler(euler);

                // Применяем ограниченное вращение к смещению камеры
                const rotatedCameraOffset = cameraOffset.applyQuaternion(limitedQuaternion);
                const targetCameraPosition = targetPosition.clone().add(rotatedCameraOffset); // Позиция камеры относительно персонажа

                // Плавное перемещение камеры
                state.camera.position.lerp(targetCameraPosition, 0.1);

                // Камера смотрит на персонажа
                state.camera.lookAt(targetPosition);
            }

            if(forward){
           //     ref.current?.setRotation(new THREE.Quaternion(rotation.x, rotation.y, rotation.z))
            }
        }
    });

    //console.log(ref.current.wakeUp())

    return (
        <>
            <RigidBody ref={ref} colliders="hull" scale={8} enabledRotations={[true,true,false]} friction={friction}  mass={mass}
                       type="dynamic" position={[0, 10, 0]}>
                <mesh geometry={nodes.AnimateWheel.geometry} material={materials["mat"]}/>
            </RigidBody>
        </>

    )
}