import {useLoader} from "@react-three/fiber";
import * as THREE from "three";

export default function CityBackground() {
    const texture = useLoader(THREE.TextureLoader, './asset/texture/city.png');

    return (
        <mesh>
            <sphereBufferGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}