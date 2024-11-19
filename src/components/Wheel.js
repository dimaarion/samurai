import {useFrame, useStore} from "@react-three/fiber";
import {Gltf, useAnimations, useGLTF} from "@react-three/drei";
import {useCylinder} from "@react-three/cannon";
import Controller, { EcctrlAnimation }  from "ecctrl";
import {useEffect, useRef} from "react";
import {BallCollider, RigidBody} from "@react-three/rapier";

export  default function Wheel(props){

    const {nodes, materials,animations} = useGLTF("./asset/model/Demon.glb");
    console.log(animations)
    const { ref, actions, names } = useAnimations(animations)
    for (const material in materials) {
        materials[material].metalness = -2
        materials[material].roughness = 1
    }

useFrame((state,delta)=>{

})

    useEffect(()=>{

    },[])
    const animationSet = {
        idle: 'CharacterArmature|Idle',
        walk: 'CharacterArmature|Walk',
        run: 'CharacterArmature|Run',
        jump: 'CharacterArmature|Jump',
        jumpIdle: 'CharacterArmature|Jump_Idle',
        jumpLand: 'CharacterArmature|Jump_Land',
        fall: 'CharacterArmature|Duck', // This is for falling from high sky
        action1: 'CharacterArmature|Wave',
        action2: 'CharacterArmature|Death',
        action3: 'CharacterArmature|HitReact',
        action4: 'CharacterArmature|Punch'
    };

    return <>
        <Controller debug animated mode="FixedCamera"  >
            <EcctrlAnimation
                characterURL={"./asset/model/Demon.glb"}
                animationSet={animationSet}
            >
                <group name="Root_Scene">
                    <group name="RootNode">
                        <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={50} position={[0, -0.85, 0]}>
                            <primitive object={nodes.Root} />
                        </group>
                        <group name="Demon" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                            <skinnedMesh
                                name="Demon_1"
                                geometry={nodes.Demon_1.geometry}
                                material={materials.Demon_Main}
                                skeleton={nodes.Demon_1.skeleton}
                                receiveShadow
                                castShadow
                            />
                            <skinnedMesh
                                name="Demon_2"
                                geometry={nodes.Demon_2.geometry}
                                material={materials.Black}
                                skeleton={nodes.Demon_2.skeleton}
                                receiveShadow
                                castShadow
                            />
                            <skinnedMesh
                                name="Demon_3"
                                geometry={nodes.Demon_3.geometry}
                                material={materials.Eye_White}
                                skeleton={nodes.Demon_3.skeleton}
                                receiveShadow
                                castShadow
                            />
                            <skinnedMesh
                                name="Demon_4"
                                geometry={nodes.Demon_4.geometry}
                                material={materials.Eye_Black}
                                skeleton={nodes.Demon_4.skeleton}
                                receiveShadow
                                castShadow
                            />
                        </group>
                        <skinnedMesh
                            name="Trident"
                            geometry={nodes.Trident.geometry}
                            material={materials.Black}
                            skeleton={nodes.Trident.skeleton}
                            position={[1.895, 1.734, -0.17]}
                            scale={75.326}
                            receiveShadow
                            castShadow
                        />
                    </group>
                </group>
            </EcctrlAnimation>
        </Controller>
    </>
}