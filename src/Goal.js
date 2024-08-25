import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {
    Box,
    ContactShadows,
    Environment,
    OrbitControls,
    Text,
    Sphere,
} from "@react-three/drei";
import {useState} from "react";
import {MeshPhysicalMaterial} from "three";




export default function Goal(props) {
    const [intersecting, setIntersection] = useState(false);
    const material = new MeshPhysicalMaterial();
    return (
        <RigidBody {...props}>
            <Box
                scale={[11, 1, 1]}
                position={[0, 3, 0]}
                material={material}
                castShadow
            />
            <Box
                scale={[1, 6, 1]}
                position={[-5, 0, 0]}
                material={material}
                castShadow
            />
            <Box
                scale={[1, 6, 1]}
                position={[5, 0, 0]}
                material={material}
                castShadow
            />

            <Box
                scale={[1, 1, 3]}
                position={[-5, -3, 0]}
                material={material}
                castShadow
            />
            <Box
                scale={[1, 1, 3]}
                position={[5, -3, 0]}
                material={material}
                castShadow
            />

<Text color={"red"} >{intersecting?"sensors":"nosensors"}</Text>

            {/**
             * We create a collider and set it to be a 'sensor'
             * This enabled intersection events, and enables
             * colliders to pass through it.
             */}
            <CuboidCollider
                position={[0, 0, 1]}
                args={[5, 3, 1]}
                sensor
                onIntersectionEnter={() => setIntersection(true)}
                onIntersectionExit={() => setIntersection(false)}
            />
        </RigidBody>
    );
};