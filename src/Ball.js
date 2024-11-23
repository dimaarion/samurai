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
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const direction2 = new THREE.Vector3();
const frontVector2 = new THREE.Vector3();
const sideVector2 = new THREE.Vector3();
const rotation = new THREE.Quaternion(routable(0), routable(0), routable(0));
const vector = new THREE.Vector3(0, 0, 2)


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
    const [speed, setSpeed] = useState(10);
    const [control, setControl] = useState(50);
    const [friction, setFriction] = useState(1);
    const [url, setUrl] = useState("./asset/model/wheel-tree.glb");
    const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0, z: 0});
    const [mass, setMass] = useState(0.5);
    const {scene} = useGLTF(props.url ? props.url : "./asset/model/wheel-tree.glb");


    //  const [rotationSpeed, setRotationSpeed] = useState(0.05); // Скорость поворота

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
            ref.current?.setRotation(rotation, true);
            ref.current?.setTranslation({x: savePlayerPosition.x, y: savePlayerPosition.y, z: savePlayerPosition.z});
            ref.current?.setAngvel({x: 0, y: 0, z: 0});

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
    const radius = 5; // Радиус вращения
    let angle = 0; // Угол вращения

    useFrame((state, delta) => {
        const {forward, backward, left, right, jump} = get()


        // update camera
        //state.camera.position.set(...ref.current?.translation())

        if (forward || backward || left || right) {
            ref.current.wakeUp()
        }

        // movement
        const velocity = ref.current?.linvel()
        let rotateCamera = state.camera.rotation;
        let targetPosition = ref.current?.translation();
        const playerRotate = ref.current?.rotation();
        frontVector.set(backward - forward, 0, 0);
        sideVector.set(0, 0, 0);

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(state.camera.rotation);
        // ref.current?.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
        // state.camera.position.set(...ref.current?.translation())

        const rotationE = new THREE.Euler();


        if (left) {
            angle += 0.01;
        }
        if (right) {
            angle -= 0.01;
        }
        // Скорость вращения
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);

         state.camera.position.set(x, 50,z); // 2 — высота камеры
         state.camera.lookAt(0, 0, 0); // Камера смотрит на центр
        //  state.camera.position.set(0, 0, 0)




        const forwardDirection = new THREE.Vector3(direction.x, direction.y, direction.z).applyEuler(rotationE);

        if (forward || backward) {
            ref.current?.setAngvel(forwardDirection.multiplyScalar(speed))
        } else {
            ref.current?.setAngvel({
                x: 0,
                y: MathUtils.lerp(state.camera.rotation.y, left ? control : right ? -control : 0, delta),
                z: 0,

            })
        }


    })

    return (
        <>
            <RigidBody ref={ref} colliders="hull" scale={0.3} friction={friction} mass={mass} type="dynamic" position={[0, 20, 0]}>

                    <primitive object={scene}/>

            </RigidBody>
        </>

    )
}