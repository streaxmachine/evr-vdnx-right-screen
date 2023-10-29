import React, { useState, useRef } from "react";
import * as THREE from "three";
import { Preload, useGLTF } from "@react-three/drei";

import Lights from "../Lights";
import MakeTrain from "./Train";

import { dataInfo } from "./dataInfo";

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const TrainContainer = ({
  count,
  setCount,
  touchedDetail,
  isDone,
  setTouchedDetail,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const train = useGLTF("/models/Ivolga_3.0_Test_3.glb");

  const parts = React.useMemo(() => {
    const randomNubmers = ["11", "12", "13", "14", "15"];
    shuffle(randomNubmers);
    const part1 = train.scene.getObjectByName("1");
    const part2 = train.scene.getObjectByName("2");
    const part3 = train.scene.getObjectByName("3");
    const part4 = train.scene.getObjectByName("4");
    const part5 = train.scene.getObjectByName("5");
    const part6 = train.scene.getObjectByName("6");
    const part7 = train.scene.getObjectByName("7");
    const part8 = train.scene.getObjectByName("8");
    const part9 = train.scene.getObjectByName("9");
    const part10 = train.scene.getObjectByName("10");

    const part11 = train.scene.getObjectByName(randomNubmers[0]);
    const part12 = train.scene.getObjectByName(randomNubmers[1]);
    const part13 = train.scene.getObjectByName(randomNubmers[2]);

    const parts = [];
    parts.push(
      { object: part1}, //prettier-ignore
      { object: part2}, //prettier-ignore
      { object: part3}, //prettier-ignore
      { object: part4}, //prettier-ignore
      { object: part5}, //prettier-ignore
      { object: part6}, //prettier-ignore
      { object: part7}, //prettier-ignore
      { object: part8}, //prettier-ignore
      { object: part9}, //prettier-ignore
      { object: part10} //prettier-ignore
      // { object: part11}, //prettier-ignore
      // { object: part12}, //prettier-ignore
      // { object: part13} //prettier-ignore
    );
    return parts;
  }, [train]);

  console.log(train);

  return (
    <>
      <color attach="background" args={["#f2f2f5"]} />
      <Lights isDragging={isDragging} />
      {parts.map((part, index) => (
        <MakeTrain
          key={index}
          isDone={isDone}
          value={Number(part.object.name)}
          part={part.object}
          posX={index * 1.5}
          count={count}
          finalData={dataInfo[index + 1]}
          setCount={setCount}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
          touchedDetail={touchedDetail}
          setTouchedDetail={setTouchedDetail}
        />
      ))}
      {/* <Preload all /> */}
    </>
  );
};

export default React.memo(TrainContainer);
