import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

const Target = (props) => {
    const targetRef = useRef()
    const {scene} = useGLTF('/models/cube.glb')

    return (
        <mesh {... props} ref={targetRef}>
            <primitive object={scene} />
        </mesh>
    )
}

export  default Target