import {useLoader, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {Decal} from "@react-three/drei";
import {useEffect} from "react";

export default function CityBackground() {
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
    const texture = textureLoader.load('./asset/texture/city.png'); // Панорамное изображение


    return (
        <mesh>
            <sphereGeometry args={[100, 50, 50]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}