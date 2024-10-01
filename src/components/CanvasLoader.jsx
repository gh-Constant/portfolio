import { Html, useProgress } from '@react-three/drei'

const CanvasLoader = () => {
    const { progress } = useProgress()
    return (
        
        <Html center>
            <div className="loader">
                <div className="loader-bar size-10" style={{width: `${progress}%`}}></div>
                
            </div>
        </Html>
    )
}

export default CanvasLoader