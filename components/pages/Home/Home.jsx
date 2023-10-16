import React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

import Train from "./Train";

const ExperienceTrain = () => {
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
      <Canvas shadows gl={{ antialias: false }}>
        <Train count={count} setCount={setCount} />
        <PerspectiveCamera makeDefault position-y={5} position-z={-10} />
      </Canvas>
    </div>
  );
};

export default ExperienceTrain;
