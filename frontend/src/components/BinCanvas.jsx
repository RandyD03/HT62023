import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import Scene from "./Scene.jsx";

const BinCanvas = (props) => {

    const { boxes } = props;
    console.log(boxes, props.boxes);

    // items => [
    //     {
    //         transparent: Boolean,
    //         position: [x, y, z],
    //         size: [l, w, h],
    //         color: string
    //     }
    // ]
    return (
        <Canvas style={{ "height": "80%" }}>
            <ambientLight />
            {boxes.map((sceneData) => (
                <Scene {...sceneData} />
            ))}
            <OrbitControls />
        </Canvas>
    );
}

export default BinCanvas;