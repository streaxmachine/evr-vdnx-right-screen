import React, { useState, useRef } from "react";
import * as THREE from "three";
import { Preload, useGLTF } from "@react-three/drei";

import Lights from "../Lights";
import MakeTrain from "./Train";

import { dataInfo } from "./dataInfo";

import { clearScene } from "utils/three";

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
  const train = useGLTF("/models/Ivolga_3.0_v12.glb");

  const floor = React.useMemo(() => {
    return train.scene.getObjectByName("00");
  }, [train]);

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
      { object: part1, id: 1 },
      { object: part2, id: 2}, //prettier-ignore
      { object: part3, id: 3}, //prettier-ignore
      { object: part4, id: 4}, //prettier-ignore
      { object: part5, id: 5}, //prettier-ignore
      { object: part6, id: 6}, //prettier-ignore
      { object: part7, id: 7}, //prettier-ignore
      { object: part8, id: 8}, //prettier-ignore
      { object: part9, id: 9}, //prettier-ignore
      { object: part10, id: 10}, //prettier-ignore
      { object: part11, id: Number(randomNubmers[0]) }, //prettier-ignore
      { object: part12, id: Number(randomNubmers[1]) }, //prettier-ignore
      { object: part13, id: Number(randomNubmers[2]) } //prettier-ignore
    );
    return parts;
  }, [train]);

  return (
    <>
      <color attach="background" args={["#f2f2f5"]} />
      <Lights isDragging={isDragging} isDone={isDone} />
      <mesh geometry={floor.geometry} material={floor.material} />
      {parts.map((part, index) => (
        <MakeTrain
          key={index}
          isDone={isDone}
          value={Number(part.object.name)}
          part={part.object}
          posX={index * 1.5}
          count={count}
          finalData={dataInfo[part.id]}
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
