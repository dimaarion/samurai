import {Box, CameraControls, Shape, Sphere, Torus, useGLTF, useKeyboardControls} from "@react-three/drei";
import {Physics, RigidBody, CuboidCollider, useRapier, BallCollider} from "@react-three/rapier";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import {useSelector, useDispatch} from 'react-redux'
import {db} from "./components/Database";
import {routable} from "./actions";
import {incrementSave} from "./reduser/savePosition";
import {MathUtils} from "three";


const SPEED = 20;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Quaternion(routable(90), routable(90), routable(-60));
const vector = new THREE.Vector3(0, 0, 2)


let position = await db.friends.where("name").startsWithAnyOfIgnoreCase(["position"]).toArray();

//position = [{x:0,y:0,z:0}]

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
    const {nodes, materials} = useGLTF("./asset/model/wheel-tree.glb");
    useEffect(() => {
        if (position.length === 0) {
            db.friends.add({name: "position", x: 0, y: 0, z: 0});
        }
        position.forEach((el) => ref.current?.setTranslation({x: el.x, y: el.y, z: el.z}));
        //  ref.current?.setRotation(rotation,true)
        console.log(rapier)
    }, []);

    useEffect(() => {
        db.friends.update(1013, savePlayerPosition)
    }, [savePlayerPosition])

    useEffect(() => {
        if (restart) {
            ref.current?.setRotation(rotation, true);
            ref.current?.setTranslation({x: savePlayerPosition.x, y: savePlayerPosition.y, z: savePlayerPosition.z});
            ref.current?.setAngvel({x: 0, y: 0, z: 0});

        }else {

        }
    }, [restart])


    useFrame((state, delta) => {
        const {forward, backward, left, right, jump} = get();
        const velocity = ref.current?.linvel();
        // update camera
        //  state.camera.position.set(...ref.current.translation());
        const targetPosition = ref.current?.translation();
        frontVector.set(backward - forward, 0, 0);
        sideVector.set(0, 0, right - left);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation);
        //  ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
        ref.current?.setAngvel({
            x: MathUtils.lerp(ref.current?.angvel().x, forward ? -Math.PI : backward ? Math.PI : 0, (delta + 0)),
            y: (direction.y / 50),
            z: MathUtils.lerp(ref.current?.angvel().z, left ? -Math.PI : right ? Math.PI : 0, delta)
        })

        const offset = new THREE.Vector3(0, 3, 0).applyQuaternion(ref.current?.angvel());
        // ref.current.rotation.x = 10
        // jumpingd
        //// const world = rapier.world.raw();
        //  const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), {x: 0, y: -1, z: 0}));
        // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 2;

        //  if (jump && grounded) ref.current.setLinvel({x: 0, y: 7.5, z: 0});


        // Обновляем позицию камеры на основе позиции персонажа
        state.camera.rotation.set(offset.x,offset.y,offset.z)
        state.camera.position.lerp(
            {
                x: targetPosition.x,
                y: targetPosition.y + 25, // Задаем высоту камеры над персонажем
                z: targetPosition.z + 50, // Расстояние камеры за персонажем
            },
            0.1 // Скорость следования камеры
        );

        state.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
        const upVector = new THREE.Vector3(0, 1, 0).applyQuaternion(ref.current?.rotation());
        const tiltAngle = upVector.angleTo(new THREE.Vector3(0, 1, 0));

        if (targetPosition.y < -100) {



        }
        if (tiltAngle > 2.5 || tiltAngle < 0.2) {
            //   ref.current?.setRotation(rotation,true)
        }

      //  console.log(state.camera)
    });


    return (
        <>

            <RigidBody ref={ref} colliders={"hull"} friction={1} rotation={[routable(90), 0, routable(90)]}
                       type="dynamic" restitution={0}>
                <mesh geometry={nodes.wheel.geometry} material={materials.mat} scale={1}/>

                <BallCollider args={[0.5]} sensor={true}/>


            </RigidBody>
        </>

    )
}