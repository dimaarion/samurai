import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {Box} from "@react-three/drei";
import {db} from "./Database"
import {incrementSave} from "../reduser/savePosition";
import {useDispatch} from "react-redux";


export default function SavePortal(props) {
    const dispatch = useDispatch()
    let x = props.position ? props.position.x : 0;
    let y = props.position ? props.position.y : 0;
    let z = props.position ? props.position.z : 0;
    return (
        <group colliders="cuboid" type="fixed">
            <Box position={[x, y, z]} scale={[0.5, 50, 0.5]} material-color="red"/>
        </group>
    )
}