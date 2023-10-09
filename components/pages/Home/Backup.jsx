import React, { useState, useRef } from "react";
import { OrthographicCamera, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";

const Test = () => {
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const train = useGLTF("/models/testTrainRazbot.glb");
  const part001 = React.useMemo(() => {
    return train.scene.getObjectByName("001");
  }, []);
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeBufferGeometry attach="geometry" args={[30, 30]} receiveShadow />
        <meshPhongMaterial
          attach="material"
          color="#ccc"
          side={THREE.DoubleSide}
          receiveShadow
        />
      </mesh>

      <planeHelper args={[floorPlane, 5, "red"]} />

      <gridHelper args={[100, 100]} />

      <Obj
        part={part001}
        posX={10}
        setIsDragging={setIsDragging}
        floorPlane={floorPlane}
      />
      {/* <Obj posX={-10} setIsDragging={setIsDragging} floorPlane={floorPlane} />
      <Obj posX={20} setIsDragging={setIsDragging} floorPlane={floorPlane} /> */}

      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

      <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
    </>
  );
};

export default Test;

function Obj({
  setIsDragging,
  floorPlane,
  posX,
  part,
  defaultPos = new THREE.Vector3(0, 0, 0),
}) {
  const [pos, setPos] = useState([posX, 0, 0]);
  const [isRightPosition, setIsRightPosition] = React.useState(false);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new THREE.Vector3();
  const vector = new THREE.Vector3(0, 0, 0);

  const dragObjectRef = useRef();
  const dragMeshRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 15 },
  }));

  // React.useEffect(() => {
  //   // console.log(isRightPosition);
  //   if (isRightPosition) {
  //     gsap.to(dragMeshRef.current.position, {y: 10, delay:1})
  //     // setPos([0, 0, 0]);
  //   }
  //   console.log(pos);
  // }, [isRightPosition]);

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      const distance = vector.distanceTo(dragMeshRef.current.position);
      const isdragable = distance > 3;

      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1, planeIntersectPoint.z]);
      }

      setIsDragging(active);
      //   console.log([y / aspect, x / aspect, 0]);
      let finalValue = pos;
      if (isdragable === false && !isRightPosition) {
        dragMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: "green",
        });

        if (active === false) {
          finalValue = [0, 0, 0];
          setIsRightPosition(true);
          dragMeshRef.current.material = new THREE.MeshStandardMaterial({
            color: "white",
          });
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
          // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
          position: finalValue,
          scale: active && isdragable ? 2.2 : 1,
          rotation: isdragable
            ? [(y / aspect) * 0.5, (x / aspect) * 0.5, 0]
            : [0, 0, 0],
        });
      }

      return timeStamp;
    },
    { delay: true }
  );

  return (
    <animated.mesh
      geometry={part.geometry}
      material={part.material}
      scale={1.5}
      ref={dragMeshRef}
      {...spring}
      {...bind()}
    >
      <meshStandardMaterial attach="material" />
    </animated.mesh>
  );
}
