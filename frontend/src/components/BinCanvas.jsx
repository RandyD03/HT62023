import "../styles/Canvas.css"

import {
    EffectComposer,
    Outline,
    SMAA,
    SSAO,
    Selection,
} from "@react-three/postprocessing"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Scene from "./Scene.jsx"

const BinCanvas = (props) => {
    const { boxes } = props

    // items => [
    //     {
    //         transparent: Boolean,
    //         position: [x, y, z],
    //         size: [l, w, h],
    //         color: string
    //     }
    // ]
    return (
        <Canvas>
            <ambientLight />
            <Selection>
                <EffectComposer autoClear={false}>
                    <SSAO
                        radius={0.05}
                        intensity={150}
                        luminanceInfluence={0.5}
                        color="black"
                    />
                    <Outline
                        visibleEdgeColor="black"
                        hiddenEdgeColor="black"
                        blur
                        width={1000}
                        edgeStrength={100}
                    />
                    <SMAA />
                </EffectComposer>
                {boxes.map((sceneData) => (
                    <Scene key={sceneData.id} {...sceneData} />
                ))}
            </Selection>
            <OrbitControls />
        </Canvas>
    )
}

export default BinCanvas
