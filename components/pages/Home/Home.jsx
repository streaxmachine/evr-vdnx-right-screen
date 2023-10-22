import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

import Train from "../Train/Train";

import s from "./Home.module.scss";

const Home = () => {
  const [count, setCount] = React.useState(1);
  return (
    <div className="canvasTrain">
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          color: "white",
          fontSize: 50,
        }}
      >
        {count}
      </div>
      <Canvas
        shadows
        orthographic
        // frameloop="demand"
        camera={{
          position: [10, 20, 20],
          rotation: [Math.PI, 0, 0],
          zoom: 30,
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Train count={count} setCount={setCount} />
      </Canvas>
    </div>
  );
};

export default React.memo(Home);
