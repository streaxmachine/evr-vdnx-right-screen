import React from "react";

const LeapTrain = ({ part, value, count, touchedDetail }) => {
  React.useEffect(() => {
    // console.log(touchedDetail, count, value);
  }, [count, touchedDetail, value]);

  const posRotValues = React.useMemo(() => {
    if (touchedDetail === value) {
      console.log("jere");
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
  }, [count, touchedDetail, value]);

  return (
    <>
      <mesh
        geometry={part.geometry}
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
