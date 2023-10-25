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
  isDone,
  posX,
  part,
  count,
  setCount,
  setTouchedDetail,
}) => {
  const { setScenario } = useStore();
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

  const material = React.useMemo(() => {
    return part.material;
  }, []);

  React.useEffect(() => {
    if (isRightPosition) {
    }
  }, [isRightPosition]);

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
      let rotation = [0, 0, 0];

      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, part.position.y, planeIntersectPoint.z]);
      }

      setIsDragging(active);
      let finalValue = pos;
      if (isdragable === false && !isRightPosition) {
        if (value === count) {
          // dragMeshRef.current.material = new THREE.MeshStandardMaterial({
          //   color: "green",
          // });
        } else {
          // dragMeshRef.current.material = new THREE.MeshStandardMaterial({
          //   color: "red",
          // });
        }

        if (active === false) {
          if (value !== count) {
            setTouchedDetail(value);
            finalValue = [
              posX,
              part.position.y,
              value > 2 ? -1.5 * value * 2 : 10 * value,
            ];

            dragMeshRef.current.material = new THREE.MeshStandardMaterial({
              color: "red",
            });
            setScenario({ type: "ivolga", place: "failDetail" });

            setTimeout(() => {
              dragMeshRef.current.material = part.material;
            }, 1300);
          } else {
            finalValue = [part.position.x, part.position.y, part.position.z];
            setTouchedDetail(value);
            setCount(count + 1);
            setIsRightPosition(true);
            setScenario({ type: "ivolga", place: "trueDetail" });
            dragMeshRef.current.material = new THREE.MeshStandardMaterial({
              color: "green",
            });
            setTimeout(() => {
              dragMeshRef.current.material = part.material;
            }, 1300);
          }
        } else {
          finalValue = pos;
        }
      } else {
        dragMeshRef.current.material = part.material;
        // dragMeshRef.current.material = new THREE.MeshStandardMaterial({
        //   color: "pink",
        // });
      }

      if (!active && !isRightPosition) {
        if (isdragable) {
          finalValue = [
            posX,
            part.position.y,
            value > 2 ? -1.5 * value * 2 : 10 * value,
          ];
          rotation = [0, 0, 0];
        }
      }

      if (!isRightPosition) {
        api.start({
          position: finalValue,
          scale: active && isdragable ? 2.2 : 1,
          rotation:
            isdragable && active ? [0, (x / aspect) * 0.1, 0] : rotation,
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
            <Html zIndexRange={(0, 1)}>
              <div className={s.value}>{value}</div>
            </Html>
          )}
        </animated.mesh>
      </group>
      <Preload all />
    </>
  );
};

export default React.memo(MakeTrain);