import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { nodes } = useGLTF("/medias/torrus.glb");
    const { viewport } = useThree()
    const torus = useRef(null);
    
    useFrame( () => {
        torus.current.rotation.x += 0.02
    })

    const layoutProps = useControls('Layout', {
        heroScale: { value: viewport.width, min: 0.5, max: 25, step: 0.1 },
        donutScale: { value: 1 / 3.75, min: 0.05, max: 1, step: 0.01 }
    })

    const materialProps = useControls('Material', {
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1},
        backside: { value: true},
    })
    
    return (
        <group scale={layoutProps.heroScale} >
            <Text font={'/fonts/PPNeueMontreal-Bold.otf'} position={[0, 0, -1]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                hello world!
            </Text>
            <mesh ref={torus} {...nodes.Torus002} scale={layoutProps.donutScale}>
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}
