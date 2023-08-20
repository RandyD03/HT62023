import {
    EffectComposer,
    Outline,
    Select,
    Selection,
} from "@react-three/postprocessing"
import React, { useRef, useState, useEffect } from "react"

const Scene = (props) => {
    const group = useRef()
    const [hovered, hover] = useState(false)
    const [rotatedItems, setRotatedItems] = useState([])

    useEffect(() => {
        console.log(props)
    })
    return (
        <group
            onPointerOver={(e) => hover(true)}
            onPointerOut={(e) => hover(false)}
            ref={group}
        >
            <Select name={`box${props.id}`} enabled={hovered}>
                <mesh position={[props.posX, props.posY, props.posZ]}>
                    <boxGeometry args={props.size} />
                    {props.transparent ? (
                        <meshPhongMaterial
                            color={props.color}
                            opacity={0.4}
                            transparent
                        />
                    ) : (
                        <meshStandardMaterial color={props.color} />
                    )}
                </mesh>
            </Select>
        </group>
    )
}

export default Scene
