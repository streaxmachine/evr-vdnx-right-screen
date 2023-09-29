import React from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import emitter from "utils/createEmmiter";
import useData from "hooks/useData";
const ExperienceTrain = () => {
  return (
    <div className="canvasTrain">
      <Canvas shadows>
        <Train />
        <Environment preset="city" />
        <PerspectiveCamera makeDefault position-y={5} position-z={-10} />
      </Canvas>
    </div>
  );
};

export default ExperienceTrain;

const Train = () => {
  const train = useGLTF("/models/trainreduced2.glb");
  const [isControls, setControls] = React.useState(true);
  const parts = React.useMemo(() => {
    const part001 = train.scene.getObjectByName("001");
    const part002 = train.scene.getObjectByName("002");
    const part003 = train.scene.getObjectByName("003");
    const part004 = train.scene.getObjectByName("004");
    const part005 = train.scene.getObjectByName("005");
    const part007 = train.scene.getObjectByName("007");
    const part008 = train.scene.getObjectByName("008");
    const part009 = train.scene.getObjectByName("009");
    const part010 = train.scene.getObjectByName("010");
    const part011 = train.scene.getObjectByName("011");
    const part012 = train.scene.getObjectByName("012");
    const part013 = train.scene.getObjectByName("013");
    const part014 = train.scene.getObjectByName("014");

    const parts = [];
    parts.push(
      {
        object: part001,
        defaultPos: part001.position,
      },
      {
        object: part002,
        defaultPos: part002.position,
      },
      {
        object: part003,
        defaultPos: part003.position,
      },
      {
        object: part004,
        defaultPos: part004.position,
      },
      {
        object: part005,
        defaultPos: part005.position,
      },
      {
        object: part007,
        defaultPos: part007.position,
      },
      {
        object: part008,
        defaultPos: part008.position,
      },
      {
        object: part009,
        defaultPos: part009.position,
      },
      {
        object: part010,
        defaultPos: part010.position,
      },
      {
        object: part011,
        defaultPos: part011.position,
      },
      {
        object: part012,
        defaultPos: part012.position,
      },
      {
        object: part013,
        defaultPos: part013.position,
      },
      {
        object: part014,
        defaultPos: part014.position,
      }
    );

    return parts;
  }, []);
  return (
    <>
      <mesh
        onPointerMove={(e) => emitter.send("clickedPlane", e.point)}
        rotation-x={-Math.PI / 2}
        position-y={0}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" receiveShadow castShadow />
      </mesh>
      {parts.map((part, index) => (
        <Part
          key={index}
          isControls={isControls}
          setControls={setControls}
          part={part.object}
          defaultPos={part.defaultPos}
          offset={index}
        />
      ))}
      <OrbitControls dampingFactor={0.15} enabled={isControls} />
    </>
  );
};
const vector = new THREE.Vector3(0, 0, 0);

function Part({ part, offset, setControls, defaultPos }) {
  const meshRef = React.useRef();
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUp, setIsUp] = React.useState(false);

  const newPosition = useData(
    {
      value: new THREE.Vector3(0, 0, 0),
    },
    []
  );

  React.useEffect(() => {
    emitter.on("clickedPlane", (data) => {
      newPosition.value = data;
    });
  }, []);

  const onMouseMove = React.useCallback(
    (event) => {
      if (isDragging) {
        const meshPos = meshRef.current.position;

        const distance = vector.distanceTo(meshPos);
        if (distance < 1) {
          meshRef.current.material = new THREE.MeshBasicMaterial({
            color: "green",
          });
          meshRef.current.position.set(
            defaultPos.x,
            defaultPos.y,
            defaultPos.z
          );
          setIsDragging(false);
          return;
        }
        meshRef.current.position.set(
          newPosition.value.x,
          defaultPos.y,
          newPosition.value.z
        );
      }
    },
    [isDragging]
  );

  const onMouseUp = () => {
    if (!isDragging) {
      setControls(true);
      meshRef.current.material = part.material;
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    if (isDragging) {
      setControls(false);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging, isUp]);

  return (
    <mesh
      ref={meshRef}
      onPointerDown={(e) => {
        setIsUp(true);
        setIsDragging(true);
      }}
      onPointerUp={() => {
        setIsUp(false);
        setIsDragging(false);
      }}
      castShadow
      receiveShadow
      geometry={part.geometry}
      material={part.material}
      position={[defaultPos.x + (offset - 4), defaultPos.y, defaultPos.z + 3]}
    />
  );
}
