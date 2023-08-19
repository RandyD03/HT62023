import React, { useRef } from "react";

const Scene = (props) => {
    const mesh = useRef();

    return (
        <mesh position={props.position} ref={mesh}>
            <boxGeometry args={props.size} />
            {
                props.transparent ?
                    <meshPhongMaterial color={props.color} opacity={0.4} transparent />
                    :
                    <meshStandardMaterial color={props.color} />
            }
        </mesh>
    )
}

export default Scene;
