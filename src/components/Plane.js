import {useBox, usePlane, useTrimesh} from "@react-three/cannon";
import {Gltf, useGLTF} from "@react-three/drei";
import {RigidBody} from "@react-three/rapier";
import {routable} from "../actions";

export default function Plane(props) {
    const {nodes, materials} = useGLTF("./asset/model/level1.glb");
    console.log(nodes)
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <Gltf castShadow receiveShadow  scale={0.11} src="./asset/model/level1.glb" />
        </RigidBody>
    )
}