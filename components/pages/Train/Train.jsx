import React, { useState, useRef } from "react";
import {
  OrbitControls,
  useGLTF,
  Html,
  Environment,
  Lightformer,
  AccumulativeShadows,
  Instances,
  Instance,
} from "@react-three/drei";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
// import { Globals } from "@react-spring/shared";

import s from "../Home/Home.module.scss";

const Train = ({ count, setCount }) => {
  React.useEffect(() => {
    // Globals.assign({
    //   frameLoop: "demand",
    // });
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  // const socket = useSocket();

  const train = useGLTF("/models/testTrainTest.glb");

  const parts = React.useMemo(() => {
    const part1 = train.scene.getObjectByName("1");
    const part2 = train.scene.getObjectByName("2");
    const part3 = train.scene.getObjectByName("3");
    // const part4 = train.scene.getObjectByName("4");
    const part5 = train.scene.getObjectByName("5");
    part5.name = "4";
    const part6 = train.scene.getObjectByName("6");
    part6.name = "5";
    const part7 = train.scene.getObjectByName("7");
    part7.name = "6";
    // const part8 = train.scene.getObjectByName("8");
    // const part9 = train.scene.getObjectByName("9");
    // const part10 = train.scene.getObjectByName("10");

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
      // {
      //   object: part4,
      // },
      {
        object: part5,
      },
      {
        object: part6,
      },
      {
        object: part7,
      }
      // {
      //   object: part8,
      // },
      // {
      //   object: part9,
      // },
      // {
      //   object: part10,
      // }
    );
    return parts;
  }, []);

  return (
    <>
      <color attach="background" args={["#f2f2f5"]} />
      <pointLight
        position={[0, 30, 3]}
        intensity={1.5}
        scale={100}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <OrbitControls
        // autoRotate={autoRotate}
        enabled={!isDragging}
        autoRotateSpeed={-0.1}
        zoomSpeed={0.25}
        minZoom={30}
        maxZoom={140}
        enablePan={false}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />
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
          posX={index * 1.5}
          count={count}
          setCount={setCount}
          // socket={socket}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
        />
      ))}

      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer
            intensity={20}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[20, 2, 1]}
          />
          <Lightformer
            type="ring"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-0.1, -1, -5]}
            scale={10}
          />
        </group>
      </Environment>

      <Grid />
      <mesh position-y={0} receiveShadow rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial transparent={true} opacity={0.3} color="white" />
      </mesh>
      {/* <Preload all /> */}
    </>
  );
};

export default Train;

const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  // Renders a grid and crosses as instances
  <Instances position={[0, -1.02, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group
          key={x + ":" + y}
          position={[
            x * 2 - Math.floor(number / 2) * 2,
            -0.01,
            y * 2 - Math.floor(number / 2) * 2,
          ]}
        >
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, "#bbb", "#bbb"]} position={[0, -0.01, 0]} />
  </Instances>
);

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
        material={
          new THREE.MeshStandardMaterial({
            color: "green",
            wireframe: true,
            transparent: true,
            opacity: 0.5,
          })
        }
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
  // socket,
  count,
  setCount,
}) {
  const [pos, setPos] = useState([
    posX,
    part.position.y,
    value > 2 ? -1.5 * value * 2 : 10 * value,
  ]);
  const [isRightPosition, setIsRightPosition] = React.useState(false);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  let planeIntersectPoint = new THREE.Vector3();
  const vector = new THREE.Vector3(0, 0, 0);

  const dragMeshRef = useRef();

  // React.useEffect(() => {
  //   if (isRightPosition) {
  //     socket.send(
  //       JSON.stringify({
  //         instalяation: "ivolga",
  //         detail: count - 1,
  //         correct: "true",
  //       })
  //     );
  //   }
  // }, [isRightPosition]);

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 15 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      const distance = vector.distanceTo(dragMeshRef.current.position);
      const isdragable = distance > 8;

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
            finalValue = [posX * -10 + 50, part.position.y, 10];
            // socket.send(
            //   JSON.stringify({
            //     instalяation: "ivolga",
            //     detail: value,
            //     correct: "false",
            //   })
            // );
            dragMeshRef.current.material = part.material;
          } else {
            finalValue = [part.position.x, part.position.y, part.position.z];
            setCount(count + 1);
            setIsRightPosition(true);
            dragMeshRef.current.material = part.material;
          }
        } else {
          finalValue = pos;
        }
      } else {
        dragMeshRef.current.material = part.material;
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
        </animated.mesh>
      </group>
    </>
  );
}
