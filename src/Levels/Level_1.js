import {routable} from "../actions";
import {RigidBody} from "@react-three/rapier";
import {Environment, useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useFrame} from "@react-three/fiber";
import CityBackground from "../components/CityBackground";
import City from "../components/City";

export default function Level_1(props) {

    const {nodes, materials, animations} = useGLTF("./asset/model/level1.glb");
    const { ref,actions} = useAnimations(animations)
    const [actionsArray, setActionsArray] = useState([])
    const pause = useSelector((state) => state.pause.value);





    useEffect(() => {
        if (props.actionsArray) {
            setActionsArray(props.actionsArray)
        }
      //  console.log(nodes)
    }, [])

    useEffect(() => {


        if(actions["coinRAction"]){
            actions["coinRAction"].play()
        }
        if(actions["opAction"]){
            actions["opAction"].play()
        }

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
//console.log(cityData)




    // Добавляем вращение HDRI окружения



    return <>
        <group {...props} ref={ref}  >
            <RigidBody  colliders="trimesh" type="fixed">
                <primitive castShadow receiveShadow object={nodes.road} name={"road"}/>
            </RigidBody>
            <primitive object={nodes.plane} />
            <primitive object={nodes.build} />
        </group>

        {/*cityData.map((el)=><City position={[el.x,el.y,el.z]}/>)*/}
        {/*<CityBackground file={'./asset/texture/maxresdefault.jpg'}/>*/}
    </>
}