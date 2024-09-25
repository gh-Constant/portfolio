import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Model1 from '../components/Model1'
import { Suspense } from 'react'
import CanvasLoader from '../components/CanvasLoader'
import { Leva, useControls } from 'leva'
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants'
import Target from '../components/Target'
import Button from '../components/Button'

const Hero = () => {

    const isMobile = useMediaQuery( {maxWidth: 768} );
    const isTablet = useMediaQuery( {minWidth: 768, maxWidth: 1024} );
    const isSmall = useMediaQuery( {maxWidth: 390});
    
    const sizes = calculateSizes(isSmall, isMobile, isTablet);
    
    const x = useControls
    ('Model1', {
        positionX: {
            value : 2.5,
            min: -10,
            max: 10,
        }  ,
          
        positionY: {
            value : 2.5,
            min: -10,
            max: 10,
        },

        positionZ: {
            value : 2.5,
            min: -10,
            max: 10,
        },

        rotationX: {
            value : 0,
            min: -10,
            max: 10,
        },

        rotationY: {
            value : 0,
            min: -10,
            max: 10,
        },

        rotationZ: {
            value : 0,
            min: -10,
            max: 10,
        },
        

        scale : {
            value : 1,
            min: 0.1,
            max: 10,
            
        },
        })

        //test

    return (
        <section className="relative flex flex-col w-full min-h-screen"> 
            <div className="flex flex-col w-full gap-3 mx-auto mt-20 sm:mt-36 c-space">
                <p className="text-xl font-medium text-center text-white sm:text-3xl font-generalsans">Arial Ipsum<span className="ml-3 waving-hand"> 👋</span></p>

                <p className="hero_tag text-gray_gradient">Teste de commit</p>
            <Leva/> 
                <Canvas className="absolute inset-0 w-full h-full mb-7">
                    <Suspense fallback={<CanvasLoader/>}>
                        <PerspectiveCamera makeDefault position={[0,0,30]}/>
                        
                        <Model1 
                            position={sizes.arPosition} z
                            rotation={[-6.6, -6.4, 0.0]}
                            scale={sizes.arSize}        
                           // position={[x.positionX, x.positionY, x.positionZ]}
                           // rotation={[x.rotationX, x.rotationY, x.rotationZ]}  
                           // scale={[x.scale, x.scale, x.scale]}
                        />
                        
                        <ambientLight intensity={5} />

                        <directionalLight intensity={50} position={[0, 10, 10]} />

                    </Suspense>
                </Canvas>
            </div>

            <div className='absolute bottom-0 left-0 right-0 z-10 w-full c-space'>
                <a href="#contact" className='w-fit'>
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96"/>
                </a>
            </div>
        </section>
    )
}

export default Hero
