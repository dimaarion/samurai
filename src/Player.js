import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import {useEffect, useRef, useState} from "react"
import {useFrame, useStore} from "@react-three/fiber"
import {useFBX, useKeyboardControls} from "@react-three/drei"
import {
  BallCollider,
  CapsuleCollider,
  CuboidCollider,
  RigidBody,
  useRapier,
  useRevoluteJoint
} from "@react-three/rapier"
import katanaUrl from "./assets/Wado_Ichimonji.fbx";
import Katana from "./arsenal/Katana";
import {routable} from "./actions";
import create from "zustand";



const SPEED = 10;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

export function Player({ lerp = THREE.MathUtils.lerp }) {
  const axe = useRef();
  const ref = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  const fbx = useFBX(katanaUrl);



  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();
    const velocity = ref.current.linvel();
    // update camera
    state.camera.position.set(...ref.current.translation());
    // update axe
   // axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
    axe.current.rotation.copy(state.camera.rotation);
    axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1));
    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // jumping
    const world = rapier.world.raw();
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -4, z: 0 }));
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;

    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
    //axe.current.setTraslate
   // console.log(ref.current.translation())
   // axe.current.setTranslation({x:ref.current.translation().x,y:ref.current.translation().y,z:ref.current.translation().z + 20})
  })




  return (
    <>
      <RigidBody ref={ref} colliders={false}  name = "player" mass={1} scale={[4,8,4]} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]}  />
        <BallCollider sensor={true} args={[50]} />

      </RigidBody>
      <group  ref={axe} >
          <Katana rotation={[routable(180), routable(-90), routable(-40)]}
                  position={[0, 0, -2]} scale={0.02} />
      </group>
    </>
  )
}
useFBX.preload("/Wado_Ichimonji.fbx")