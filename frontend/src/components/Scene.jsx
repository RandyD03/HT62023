import React, { useRef, useState } from "react";
import { EffectComposer, Selection, Select, Outline } from "@react-three/postprocessing"

const Scene = (props) => {
    const group = useRef()
    const [hovered, hover] = useState(false)

    return (
        <group onPointerOver={(e) => hover(true)} onPointerOut={(e) => hover(false)} ref={group}>
            <Select name={`box${props.id}`} enabled={hovered}>
                <mesh position={props.position}>
                    <boxGeometry args={props.size} />
                    {
                        props.transparent ?
                            <meshPhongMaterial color={props.color} opacity={0.4} transparent />
                            :
                            <meshStandardMaterial color={props.color} />
                    }
                </mesh>
            </Select>
        </group>
    )
}

export default Scene;
