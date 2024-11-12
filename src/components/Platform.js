import {Box, Torus} from "@react-three/drei";
import {Physics, RigidBody, CuboidCollider} from "@react-three/rapier";
import {routable} from "../actions";

export default function Platform() {
    return (
        <RigidBody colliders="cuboid" type="fixed">
            <Box position={[0,-5,0]} scale={[20,1,1000]} rotation={[routable(0),routable(0),routable(0)]} material-color="blue" />
            <Box position={[0,-5,-101]} scale={[20,1,1000]} rotation={[routable(0),routable(0),routable(0)]} material-color="blue" />

        </RigidBody>
    )
}