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
      <Canvas shadows gl={{ antialias: false }} frameloop="demand">
        <Train count={count} setCount={setCount} />
        <PerspectiveCamera makeDefault position-y={5} position-z={-10} />
      </Canvas>
    </div>
  );
};

export default React.memo(Home);
