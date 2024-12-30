import {BallCollider, CuboidCollider, RigidBody} from "@react-three/rapier";
import {Gltf, useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFrame} from "@react-three/fiber";
import {get,set} from "lockr";
import {updateGarage} from "../reduser/garage";


export default function Level_1(props) {

    const {nodes, materials, animations} = useGLTF(props?.url);
    const {ref, actions, names} = useAnimations(animations)
    const [actionsArray, setActionsArray] = useState([])
    const pause = useSelector((state) => state.pause.value);
    const [point, setPoint] = useState("blue");
    const dispatch = useDispatch();

    const block = useRef();
    useEffect(() => {


    }, [])

    useEffect(() => {
        console.log(names)
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


    return <>
        <group ref={ref} position={props.position} scale={2}>
            <RigidBody colliders="trimesh" type="fixed">
                <group>
                    <primitive object={nodes.platform}/>
                </group>
            </RigidBody>
            <RigidBody ref={block} colliders="trimesh" type="kinematicVelocity">
                <primitive object={nodes.block}/>
            </RigidBody>
            <RigidBody name={"point"} colliders={"cuboid"} sensor={true} type={"fixed"} onIntersectionEnter={(e) => {
                setPoint("green")
                let garage = get("lockr_garage");
                let levels = get("lockr_levels").map((el)=>{
                    if(el.level === props.level){
                        el.playerPosition = [e.rigidBodyObject.position.x,e.rigidBodyObject.position.y,e.rigidBodyObject.position.z]
                        garage.map((el)=>el.position = [e.rigidBodyObject.position.x,e.rigidBodyObject.position.y,e.rigidBodyObject.position.z])
                    }
                    return el;
                })
             //   set("lockr_levels",levels);
                dispatch(updateGarage(garage))
              //  set("lockr_garage",garage);
            }}>
                <group>
                    <mesh geometry={nodes.point.geometry} material-color={point}/>
                </group>

            </RigidBody>
            <group>
                <primitive object={nodes.plane}/>
                <primitive object={nodes.fon}/>
                <primitive object={nodes.finih}/>
            </group>


        </group>

    </>

}
