import React, { useState, useRef } from "react";
import * as THREE from "three";
import { Html, Preload } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";

import useStore from "hooks/useStore";

import s from "../Home.module.scss";

const MakeTrain = ({
  setIsDragging,
  floorPlane,
  value,
  finalData,
  isDone,
  part,
  count,
  setCount,
  setTouchedDetail,
}) => {
  const { setScenario } = useStore();
  const [pos, setPos] = useState([
    part.position.x,
    part.position.y,
    part.position.z,
  ]);
  const [isRightPosition, setIsRightPosition] = React.useState(false);
  let planeIntersectPoint = new THREE.Vector3();
  const vector = new THREE.Vector3(0, 0, 0);

  const color = React.useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: "yellow" });
  }, []);

  React.useEffect(() => {
    if (count >= 3 && value === 1) {
      dragMeshRef.current.material = color;
      setTimeout(() => {
      dragMeshRef.current.material.wireframe = true;
      }, 3500);
    }
    if (count >= 3 && value === 2) {
      dragMeshRef.current.visible = false;
    }
  }, [count]);

  const dragMeshRef = useRef();

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    rotation: [part.rotation.x, part.rotation.y, part.rotation.z],
    config: { friction: 15 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      const distance = vector.distanceTo(dragMeshRef.current.position);
      const isdragable = distance > 8;
      let rotation = [part.rotation.x, part.rotation.y, part.rotation.z];

      if (!isDone) {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([
            planeIntersectPoint.x,
            part.position.y,
            planeIntersectPoint.z,
          ]);
        }

        setIsDragging(active);
        let finalValue = pos;
        if (isdragable === false && !isRightPosition) {
          if (active === false) {
            if (value !== count) {
              setTouchedDetail(value);
              finalValue = [part.position.x, part.position.y, part.position.z];

              dragMeshRef.current.material = new THREE.MeshStandardMaterial({
                color: "red",
              });
              setScenario({ type: "ivolga", place: "failDetail" });

              setTimeout(() => {
                dragMeshRef.current.material = part.material;
              }, 1300);
              if (value > 10) {
                setScenario({ type: "ivolga", place: "wrongDetail" });
              }
            } else {
              setTouchedDetail(value);
              setCount(count + 1);
              setIsRightPosition(true);
              setScenario({ type: "ivolga", place: "trueDetail" });
              dragMeshRef.current.material = new THREE.MeshStandardMaterial({
                color: "green",
              });
              setTimeout(() => {
                dragMeshRef.current.material = part.material;
                // dragMeshRef.current.material. = true
              }, 1300);
              finalValue = [
                finalData.position[0],
                finalData.position[1],
                finalData.position[2],
              ];
              rotation = [
                finalData.rotation[0],
                finalData.rotation[1],
                finalData.rotation[2],
              ];
            }
          } else {
            finalValue = pos;
          }
        } else {
          dragMeshRef.current.material = part.material;
        }

        if (!active && !isRightPosition) {
          if (isdragable) {
            finalValue = [part.position.x, part.position.y, part.position.z];
            rotation = [part.rotation.x, part.rotation.y, part.rotation.z];
          }
        }

        if (!isRightPosition) {
          api.start({
            position: finalValue,
            scale: active && isdragable ? 2.2 : 1,
            rotation:
              isdragable && active
                ? [part.rotation.x, part.rotation.y + x * 0.001, 0]
                : rotation,
          });
        }
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
          {!isRightPosition && value === 2 && (
            <Html zIndexRange={(0, 1)}>
              <div className={s.value}>Покраска</div>
            </Html>
          )}
        </animated.mesh>
      </group>
      <Preload all />
    </>
  );
};

export default React.memo(MakeTrain);
