import React from "react";

import * as THREE from "three";

const TrainPlaceholder = ({ part, number, value, isDragging }) => {
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
};

export default React.memo(TrainPlaceholder);
