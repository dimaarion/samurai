import {Box, Gltf, Torus, useGLTF} from "@react-three/drei";
import {Physics, RigidBody, CuboidCollider} from "@react-three/rapier";
import {routable} from "../actions";

export default function Platform() {
    const {nodes, materials} = useGLTF("./asset/model/level1.glb");
console.log(nodes)
    return (
        <>
            <RigidBody rotation={[routable(0), routable(0), routable(0)]} position={[0, -5, 10]} colliders="trimesh"
                       type="fixed">
                <mesh geometry={nodes.road_1.geometry}  material={materials.panel}/>

            </RigidBody>
            <RigidBody colliders="trimesh" type="fixed" position={[0, -5, 10]} >
                    <mesh geometry={nodes.road_2.geometry}  material={materials.fence}/>
            </RigidBody>
            <RigidBody colliders="trimesh" type="fixed" position={[0, -5, 10]} >
                <mesh geometry={nodes.road_3.geometry}   material={materials.fence}/>
            </RigidBody>
            <RigidBody colliders="trimesh" type="fixed" position={[0, -5, 10]} >
                <mesh geometry={nodes.road_4.geometry}   material={materials.fence}/>
            </RigidBody>
            <RigidBody colliders="trimesh" type="fixed" position={[0, -5, 10]} >
                <mesh geometry={nodes.road_6.geometry}   material={materials.finih}/>
            </RigidBody>
            <RigidBody colliders="trimesh" type="fixed" position={[0, -5, 10]} >
                <mesh geometry={nodes.road_7.geometry}   material={materials.finihPortal}/>
            </RigidBody>
        </>

    )
}