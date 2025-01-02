import {BallCollider, RigidBody} from "@react-three/rapier";
import {useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFrame} from "@react-three/fiber";
import {updateGarage} from "../reduser/garage";


export default function Level_1(props) {

    const {nodes, materials, animations} = useGLTF(props?.url);
    const {ref, actions, names} = useAnimations(animations)
    const [actionsArray, setActionsArray] = useState([])
    const selectGarage = useSelector((state) => state.garage.value);
    const [point, setPoint] = useState("blue");
    const dispatch = useDispatch();

    const block = useRef();
    useEffect(() => {


    }, [])

    useEffect(() => {
        console.log(nodes)
    }, [])

    const generateCityData = (rows, cols, spacing) => {
        const buildings = [];
        const startX = -((cols - 1) * spacing) / 2; // Центрирование по X
        const startZ = -((rows - 1) * spacing) / 2; // Центрирование по Z

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                buildings.push({
                    x: startX + j * spacing,
                    y: 0,
                    z: startZ + i * spacing,
                });
            }
        }

        return buildings;
    };

// Пример: 5 рядов и 5 колонн зданий с расстоянием 500 между ми
    const cityData = generateCityData(5, 1, 150);


    useFrame((state, delta, frame) => {
        block.current?.setAngvel({
            x: 0,
            y: 1,
            z: 0
        })
    })

    function savePositions(e) {
        return selectGarage.map(obj =>
            obj.id === 1 ? {
                ...obj,
                position: [e.rigidBodyObject.position.x, e.rigidBodyObject.position.y, e.rigidBodyObject.position.z]
            } : obj
        );
    }


    return <>
        <group ref={ref} position={props.position} scale={0.5}>
            <RigidBody colliders="trimesh" type="fixed">
                <group>
                    <primitive object={nodes.platform}/>
                </group>
            </RigidBody>

            <RigidBody name={"point"} colliders={"trimesh"}  type={"fixed"} onIntersectionExit={(e)=>{
                e.target.rigidBodyObject.children[0]?.material?.color.set('blue');
            }
            } onIntersectionEnter={(e) => {
                e.target.rigidBodyObject.children[0]?.material?.color.set('green');
                dispatch(updateGarage(savePositions(e)))
            }}>
                <group>
                    <primitive object={nodes.point} />
                    <primitive object={nodes.point_1} />
                </group>

            </RigidBody>
            <RigidBody name={"point"} colliders={"trimesh"}  type={"fixed"} onIntersectionExit={(e)=>{
                 e.target.rigidBodyObject.children[0]?.material?.color.set('blue');
            }
            } onIntersectionEnter={(e) => {
                   e.target.rigidBodyObject.children[0]?.material?.color.set('green');
                  dispatch(updateGarage(savePositions(e)))
            }}>
                <group>
                    <primitive object={nodes.point_1} />
                </group>

            </RigidBody>
            <RigidBody name={"point"} colliders={"trimesh"}  type={"fixed"} >
                <group>
                    <primitive object={nodes.point_2} />
                </group>
<BallCollider args={ [2,2,2]} sensor={true} onIntersectionExit={(e)=>{
    e.target.rigidBodyObject.children[0]?.material?.color.set('blue');
}
} onIntersectionEnter={(e) => {

    e.target.rigidBodyObject.children[0]?.material?.color.set('green');
    dispatch(updateGarage(savePositions(e)))
    console.log("test")
}}/>
            </RigidBody>
            <group>

                {/*<primitive object={nodes.Landscape}/>*/}

            </group>


        </group>

    </>

}
