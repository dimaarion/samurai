import {useCallback, useEffect, useRef, useState} from "react"
import {Text, useGLTF, useTexture} from "@react-three/drei"
import {BallCollider, CuboidCollider, RigidBody} from "@react-three/rapier"
import create from "zustand"
import sceneUrl from "./assets/scene.glb";
import {useFrame} from "@react-three/fiber";

export default function Box(props) {
    const [intersecting, setIntersection] = useState("blue");
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [positionPlayer, setPositionPlayer] = useState({x:0,z:0});
    const [isSensor, setIsSensor] = useState(false);
    const ref = useRef();
    const lev = useRef();
    const {nodes, materials} = useGLTF(sceneUrl)

    const useBearStore = create((set) => ({
        bears: 0,
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
    }))

    const bears = useBearStore((state) => state.bears)

    function onClick(e) {
        e.object.position.x += 1
    }
console.log(bears)
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
            ref.current.setLinvel({ x: positionPlayer.x, y: 0, z: positionPlayer.z });
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
            <mesh receiveShadow castShadow   onPointerUp = {()=>setActive(false)}  onPointerDown = {()=>setActive(true)} >
                <meshStandardMaterial color={intersecting}/>
                <boxGeometry/>
            </mesh>
            <mesh ref={lev} fontSize={1} position={[0,1.5,0]} scale = {[2,0.5,0.5]}>
                <meshStandardMaterial color={"red"} />
                <boxGeometry/>
            </mesh>
            <BallCollider sensor={true} args={[50]} onIntersectionEnter={(e)=> {
                setIntersection("green");
                persecute(e)
            }} onIntersectionExit={()=> {
                setIntersection("blue");
                setIsSensor(false)
            }} />
            <CuboidCollider sensor={true} args={[3,3,3]} onIntersectionExit={()=> {
                setName("");

            }} onIntersectionEnter={(e)=> {
                setName(e.rigidBodyObject.name);

            }}/>
        </RigidBody>

    </group>





}
useGLTF.preload("/scene.glb")