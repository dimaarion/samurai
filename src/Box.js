import {useCallback, useEffect, useRef, useState} from "react"
import {Text, useGLTF, useTexture} from "@react-three/drei"
import {BallCollider, CuboidCollider, RigidBody} from "@react-three/rapier"
import sceneUrl from "./assets/scene.glb";
import {useFrame} from "@react-three/fiber";
import { decrement, increment, incrementByAmount } from './reduser/clickObject.js'
import { incrementInvent, decrementInvent, incrementByAmountInvent } from './reduser/invent.js'
import {useDispatch, useSelector} from "react-redux";

export default function Box(props) {
    const [intersecting, setIntersection] = useState("blue");
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [positionPlayer, setPositionPlayer] = useState({x:0,z:0});
    const [isSensor, setIsSensor] = useState(false);
    const ref = useRef();
    const lev = useRef();
    const {nodes, materials} = useGLTF(sceneUrl)
    const clickObject = useSelector((state) => state.clickObject.value)
    const dispatch = useDispatch()



    useEffect(() => {
        if(name === "player" && active){
            setTimeout(()=>{
                if(lev.current.scale.x > 0){
                    lev.current.scale.x -= 1
                }
                if(lev.current.scale.x < 0.1){
                    lev.current.visible = false;
                }
            },500)


        }

    }, [active])

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if(isSensor){
         //   ref.current.setLinvel({ x: positionPlayer.x, y: 0, z: positionPlayer.z });
        }
    })

    function persecute(e){
        let rotation = Math.atan2(e.rigidBodyObject.position.x,e.rigidBodyObject.position.z);
        let ax = Math.cos(rotation);
        let ay = Math.sin(rotation);
        setPositionPlayer({x:ax,z:ay})
        setIsSensor(true)


    }


    return <group>
        <RigidBody {...props} colliders="cuboid" name = "box" contactSkin = {5}  ref={ref} enabledRotations={[false, false, false]} >
            <mesh receiveShadow castShadow
                  onPointerUp = {()=> {setActive(false);dispatch(decrement())}}
                  onPointerDown = {()=> {setActive(true);}}
                  onClick = {()=> {
                      clickObject ? dispatch(decrement()) : dispatch(increment());
                      dispatch(incrementInvent({name:"test",icon:"icon"}))
                  }}
            >
                <meshStandardMaterial color={intersecting}/>
                <boxGeometry/>
            </mesh>
            <mesh ref={lev} fontSize={1} position={[0,1.5,0]} scale = {[8,0.5,0.5]}>
                <meshStandardMaterial color={"red"} />
                <boxGeometry/>
            </mesh>
            <CuboidCollider sensor={true} args={[3,3,3]} onIntersectionExit={()=> {
                setName("");

            }} onIntersectionEnter={(e)=> {
                setName(e.rigidBodyObject.name);

            }}/>
        </RigidBody>

    </group>





}
useGLTF.preload("/scene.glb")