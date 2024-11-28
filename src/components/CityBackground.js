import {useLoader, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {Decal} from "@react-three/drei";
import {useEffect} from "react";

export default function CityBackground(props) {
    const Background = () => {
        const { scene } = useThree();
        useEffect(() => {
            const loader = new THREE.TextureLoader();
            loader.load('./asset/texture/city.png', (texture) => {
                scene.background = texture; // Устанавливаем текстуру фоном
            });
        }, [scene]);

        return null;
    };

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(props.file); // Панорамное изображение


    return (
        <mesh position={[0,50,0]}>
            <sphereGeometry args={[600, 50, 50]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}