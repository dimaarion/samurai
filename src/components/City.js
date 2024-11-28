import {useMemo} from "react";
import {Box, useTexture} from "@react-three/drei";

export default function City(props) {

    const buildingTexture = useTexture({
        map: "./asset/texture/facade-2663296_1280.jpg", // Текстура стен
    });

    const planeTexture = useTexture({
        map: "./asset/texture/closeup-road-texture-top-view_41050-1756.jpg", // Текстура стен
    });

    // Генерируем здания с разной высотой
    const buildings = useMemo(() => {
        const buildingData = [];
        for (let i = 0; i < 100; i++) {
            buildingData.push({
                position: [
                    Math.random() * 500 - 250, // Положение X
                    Math.random() * 10,       // Положение Y (слегка приподняты)
                    Math.random() * 500 - 250 // Положение Z
                ],
                height: Math.random() * 100 + 10 // Высота здания
            });
        }
        return buildingData;
    }, []);

    return (
        <group {...props}>
            {/* Основа города */}
            <mesh receiveShadow rotation-x={-Math.PI / 2}>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial {...planeTexture} color="white"  />
            </mesh>

            {/* Здания */}
            {buildings.map((building, index) => (
                <Box
                    key={index}
                    args={[20, building.height, 20]} // Ширина, высота, глубина здания
                    position={[building.position[0], building.height / 2, building.position[2]]}
                >
                    <meshStandardMaterial  {...buildingTexture} color="white"  />
                </Box>
            ))}
        </group>
    );
}