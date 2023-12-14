import React from "react";
import * as THREE from "three";

const LeapTrain = ({ part, value, count, touchedDetail }) => {
  const meshRef = React.useRef();
  React.useEffect(() => {
    console.log(count);
    if (value === 1) {
      if (count < 2) {
        meshRef.current.material = new THREE.MeshStandardMaterial({
          color: "white",
        });
      }

      if (count > 2 && count < 10) {
        meshRef.current.material = part.material;
        setTimeout(() => {
          meshRef.current.material.transparent = true;
          meshRef.current.material.opacity = 0.2;
        }, 1000);
      }
      if (count > 10) {
        meshRef.current.material = part.material;
        meshRef.current.material.transparent = false;
        meshRef.current.material.opacity = 1;
      }
    }
    if (value === 2 && count > 2) {
      meshRef.current.visible = false;
    }
  }, [count]);

  const posRotValues = React.useMemo(() => {
    if (value === count - 1) {
      return {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      };
    } else if (value < count) {
      return {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      };
    } else {
      return {
        position: [part.position.x, part.position.y, part.position.z],
        rotation: [part.rotation.x, part.rotation.y, part.rotation.z],
      };
    }
  }, [count]);

  return (
    <>
      <mesh
        geometry={part.geometry}
        ref={meshRef}
        material={part.material}
        position={posRotValues.position}
        rotation={posRotValues.rotation}
        // visible={isDone && value > 10 ? false : true}
        castShadow
        receiveShadow
      ></mesh>
    </>
  );
};

export default React.memo(LeapTrain);
