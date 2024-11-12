import {Box, Shape, Sphere, Torus, useKeyboardControls} from "@react-three/drei";
import {Physics, RigidBody, CuboidCollider, useRapier, CapsuleCollider, BallCollider} from "@react-three/rapier";
import {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import {useSelector, useDispatch} from 'react-redux'
import {db} from "./components/Database";
import {routable} from "./actions";

const SPEED = 20;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();


let position = await db.friends.where("name").startsWithAnyOfIgnoreCase(["position"]).toArray();

//position = [{x:0,y:0,z:0}]

export default function Ball(props) {
    const savePlayerPosition = useSelector((state) => state.savePosition.value)
    const dispatch = useDispatch()
    const [, get] = useKeyboardControls();
    const ref = useRef();
    const rapier = useRapier();
    const cameraRef = useRef();
    const rotate = useRef();


    useEffect(() => {
        if (position.length === 0) {
            db.friends.add({name: "position", x: 0, y: 0, z: 0});
        }
        position.forEach((el) => ref.current?.setTranslation({x: el.x, y: el.y, z: el.z}));
    }, []);

    useEffect(() => {
        db.friends.update(1013, savePlayerPosition)
    }, [savePlayerPosition])

    const rotationSpeed = 0.1;

    useFrame((state) => {
        const {forward, backward, left, right, jump} = get();
        const velocity = ref.current.linvel();
        // update camera
        //  state.camera.position.set(...ref.current.translation());

        frontVector.set(backward - forward, 0, 0);
        sideVector.set(0, 0, right - left);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation);
        //  ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
        ref.current.setAngvel({x: direction.x, y: (direction.y / 100), z: 0})
        // ref.current.rotation.x = 10
        // jumping
        const world = rapier.world.raw();
        const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), {x: 0, y: -1, z: 0}));
        const grounded = ray && ray.collider && Math.abs(ray.toi) <= 2;

        if (jump && grounded) ref.current.setLinvel({x: 0, y: 7.5, z: 0});

        const targetPosition = ref.current.translation();
        // Обновляем позицию камеры на основе позиции персонажа
        state.camera.position.lerp(
            {
                x: targetPosition.x,
                y: targetPosition.y + 10, // Задаем высоту камеры над персонажем
                z: targetPosition.z + 25, // Расстояние камеры за персонажем
            },
            0.1 // Скорость следования камеры
        );
      //  rotate.current.position.x = targetPosition.x
      //  rotate.current.position.y = targetPosition.y
      //  rotate.current.position.z = targetPosition.z
       // rotate.current.positions.x = targetPosition.x;
        // Устанавливаем камеру, чтобы она смотрела на персонажа
        state.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);

        if (targetPosition.y < -100) {
            ref.current?.setTranslation({x: savePlayerPosition.x, y: savePlayerPosition.y, z: savePlayerPosition.z});
            ref.current.setAngvel({x: 0, y: 0, z: 0})
        }

    });


    return (
        <>

            <RigidBody ref={ref} colliders={"hull"}  type="dynamic" restitution={0} >
                <mesh rotation={[routable(90), 0, routable(90)]} scale={4}>
                    <cylinderGeometry args={[1, 1, 0.5, 32]}/>
                    <meshStandardMaterial color="gray"/>
                </mesh>

                {/*<Sphere scale={2}>
                <meshStandardMaterial color="hotpink"/>
            </Sphere>*/}


                <BallCollider args={[0.5]} sensor={true}/>
                <perspectiveCamera ref={cameraRef} fov={75}/>
            </RigidBody>
        </>

    )
}