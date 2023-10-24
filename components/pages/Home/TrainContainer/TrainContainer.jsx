import React, { useState, useRef } from "react";
import * as THREE from "three";
import { Preload, useGLTF } from "@react-three/drei";

import Lights from "../Lights";
import ShowTrain from "../TrainPlaceholder";
import MakeTrain from "./Train";

const TrainContainer = ({
  count,
  setCount,
  touchedDetail,
  isDone,
  setTouchedDetail,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const train = useGLTF("/models/testTrainTest.glb");

  const parts = React.useMemo(() => {
    const part1 = train.scene.getObjectByName("1");
    const part2 = train.scene.getObjectByName("2");
    const part3 = train.scene.getObjectByName("3");

    const parts = [];
    parts.push(
      { object: part1}, //prettier-ignore
      { object: part2}, //prettier-ignore
      { object: part3} //prettier-ignore
    );
    return parts;
  }, [train]);

  return (
    <>
      <color attach="background" args={["#f2f2f5"]} />
      <Lights isDragging={isDragging} />
      {/* {parts.map((part, index) => (
        <ShowTrain
          key={index}
          value={Number(part.object.name)}
          part={part.object}
          number={count}
          isDragging={isDragging}
        />
      ))} */}
      {parts.map((part, index) => (
        <MakeTrain
          key={index}
          isDone={isDone}
          value={Number(part.object.name)}
          part={part.object}
          posX={index * 1.5}
          count={count}
          setCount={setCount}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
          touchedDetail={touchedDetail}
          setTouchedDetail={setTouchedDetail}
        />
      ))}
      <Preload all />
    </>
  );
};

export default React.memo(TrainContainer);
