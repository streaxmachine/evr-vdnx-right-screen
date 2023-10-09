import React, { useState, useRef } from "react";
import {
  OrthographicCamera,
  OrbitControls,
  useGLTF,
  Html,
  Stage,
  Grid,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import s from "./Home.module.scss";

const Train = ({ count, setCount }) => {
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const train = useGLTF("/models/trainTestrazbor.glb");
  // console.log(train);
  const parts = React.useMemo(() => {
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
    const part11 = train.scene.getObjectByName("11");
    const part12 = train.scene.getObjectByName("12");
    const part13 = train.scene.getObjectByName("13");

    const parts = [];
    parts.push(
      {
        object: part1,
      },
      {
        object: part2,
      },
      {
        object: part3,
      },
      {
        object: part4,
      },
      {
        object: part5,
      },
      {
        object: part7,
      },
      {
        object: part8,
      },
      {
        object: part9,
      },
      {
        object: part10,
      },
      {
        object: part11,
      },
      {
        object: part12,
      },
      {
        object: part13,
      },
      {
        object: part6,
      }
    );
    return parts;
  }, []);

  return (
    <>
      <color attach={"background"} args={["#95a8c7"]} />
      <pointLight
        position={[0, 30, 3]}
        intensity={1.5}
        scale={100}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Grid
        renderOrder={-1}
        position={[0, -0.05, 0]}
        infiniteGrid
        cellSize={0.1}
        scale={15}
        cellThickness={0.6}
        sectionSize={10.3}
        sectionThickness={5.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={80}
      />
      <fog attach="fog" args={["#95a8c7", 55, 70.5]} />
      {parts.map((part, index) => (
        <ShowTrain
          key={index}
          value={Number(part.object.name)}
          part={part.object}
          number={count}
          isDragging={isDragging}
        />
      ))}
      {parts.map((part, index) => (
        <Obj
          key={index}
          value={Number(part.object.name)}
          part={part.object}
          posX={index}
          count={count}
          setCount={setCount}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
        />
      ))}

      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

      <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" blur={0.8} />
      <mesh position-y={-0.1} receiveShadow rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial transparent={true} color="gray" />
      </mesh>
    </>
  );
};

export default Train;

function ShowTrain({ part, number, value, isDragging }) {
  const isShow = React.useMemo(() => {
    if (isDragging) {
      return number === value;
    } else {
      return false;
    }
  }, [number, isDragging]);
  return (
    <group>
      <mesh
        geometry={part.geometry}
        material={new THREE.MeshStandardMaterial({ color: "green" })}
        position={part.position}
        visible={isShow}
      ></mesh>
    </group>
  );
}

function Obj({
  setIsDragging,
  floorPlane,
  value,
  posX,
  part,
  count,
  setCount,
}) {
  const [pos, setPos] = useState([posX * 1.35, 0, posX * 2 - 13]);
  const [isRightPosition, setIsRightPosition] = React.useState(false);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new THREE.Vector3();
  const vector = new THREE.Vector3(0, 0, 0);

  const dragMeshRef = useRef();

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 15 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      const distance = vector.distanceTo(dragMeshRef.current.position);
      const isdragable = distance > 3;

      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, part.position.y, planeIntersectPoint.z]);
      }

      setIsDragging(active);
      let finalValue = pos;
      if (isdragable === false && !isRightPosition) {
        dragMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: "green",
        });

        if (active === false) {
          if (value !== count) {
            finalValue = [posX * 1.35, 0, posX * 2 - 13];
            dragMeshRef.current.material = new THREE.MeshStandardMaterial({
              color: "white",
            });
          } else {
            finalValue = [part.position.x, part.position.y, part.position.z];
            setCount(count + 1);
            setIsRightPosition(true);
            dragMeshRef.current.material = new THREE.MeshStandardMaterial({
              color: "white",
            });
          }
        } else {
          finalValue = pos;
        }
      } else {
        dragMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: "white",
        });
      }

      if (!isRightPosition) {
        api.start({
          position: finalValue,
          scale: active && isdragable ? 2.2 : 1,
          rotation: isdragable ? [0, (x / aspect) * 0.5, 0] : [0, 0, 0],
        });
      }

      return timeStamp;
    },
    { delay: true }
  );

  return (
    <>
      <group>
        <animated.mesh
          geometry={part.geometry}
          material={part.material}
          scale={1.5}
          castShadow
          receiveShadow
          ref={dragMeshRef}
          {...spring}
          {...bind()}
        >
          {!isRightPosition && (
            <Html>
              <div className={s.value}>{value}</div>
            </Html>
          )}
          <meshStandardMaterial attach="material" />
        </animated.mesh>
      </group>
    </>
  );
}
