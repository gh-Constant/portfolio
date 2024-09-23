import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Model1 from '../components/Model1'
import { Suspense } from 'react'
import CanvasLoader from '../components/CanvasLoader'
import { HackerRoom } from '../components/HackerRoom'
import { DirectionalLight } from 'three'

const Hero = () => {
    return (
        <section className="relative flex flex-col w-full min-h-screen"> 
            <div className="flex flex-col w-full gap-3 mx-auto mt-20 sm:mt-36 c-space">
                <p className="text-xl font-medium text-center text-white sm:text-3xl font-generalsans">Arial Ipsum<span className="ml-3 waving-hand"> 👋</span></p>

                <p className="hero_tag text-gray_gradient">Arial Ipsum & Selecto placto</p>

                <Canvas className="absolute inset-0 w-full h-full">
                    <Suspense fallback={<CanvasLoader/>}>
                        <PerspectiveCamera makeDefault position={[0,0,30]}/>
                        <Model1 scale='1.25' position={[5,0,0]} rotation={[0, 0, 0]}   />
                            
                        <ambientLight intensity={5} />

                        <directionalLight intensity={50} position={[0, 10, 10]} />

                    </Suspense>
                </Canvas>
            </div>

            
        </section>
    )
}

export default Hero
