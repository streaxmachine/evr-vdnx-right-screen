import React from "react";
import { Canvas } from "@react-three/fiber";
import Lottie from "lottie-react";
import { Html, Preload, useProgress } from "@react-three/drei";

import TrainContainer from "../TrainContainer";

import handAnimation from "../handAnimation.json";

import s from "../Home.module.scss";

const Canvas3d = ({
  isDone,
  count,
  setCount,
  touchedDetail,
  setTouchedDetail,
}) => {
  return (
    <Canvas
      shadows
      orthographic
      camera={{
        position: [10, 20, 20],
        rotation: [Math.PI, 0, 0],
        zoom: 20,
      }}
      gl={{ preserveDrawingBuffer: true, antialias: false }}
    >
      <TrainContainer
        isDone={isDone}
        count={count}
        setCount={setCount}
        touchedDetail={touchedDetail}
        setTouchedDetail={setTouchedDetail}
      />
      {touchedDetail === 0 && (
        <mesh visible={false}>
          <Html
            position={[-2, -2, 0]}
            zIndexRange={[0, 1]}
            className={s.finger}
            scale={100}
          >
            <Lottie animationData={handAnimation} />
          </Html>
          <boxGeometry />
        </mesh>
      )}
    </Canvas>
  );
};

export default Canvas3d;
