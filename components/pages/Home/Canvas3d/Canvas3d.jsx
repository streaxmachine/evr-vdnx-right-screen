import React from "react";
import { Canvas } from "@react-three/fiber";
import Lottie from "lottie-react";
import {
  Html,
  OrthographicCamera,
  Preload,
  useProgress,
} from "@react-three/drei";

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
      gl={{ preserveDrawingBuffer: true, antialias: false }}
    >
      <OrthographicCamera makeDefault 
        near={0.001}
        far={1000}
        zoom={25}
        position={[7.2, 45.2, 10.3]}
      />
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
