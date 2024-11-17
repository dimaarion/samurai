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
    let test= 10;
    return (
       <Background/>
    );
}