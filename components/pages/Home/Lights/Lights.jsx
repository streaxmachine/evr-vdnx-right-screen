import React from "react";
import * as THREE from "three";
import {
  Environment,
  Lightformer,
  Instances,
  Instance,
  OrbitControls,
} from "@react-three/drei";

const Lights = ({ isDragging, isDone }) => {
  return (
    <>
      <pointLight
        position={[0, 30, 3]}
        intensity={1.5}
        scale={100}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <OrbitControls
        autoRotate={isDone}
        enabled={!isDragging}
        autoRotateSpeed={-0.7}
        zoomSpeed={0.25}
        minZoom={23}
        maxZoom={140}
        enablePan={false}
        touches={
          !isDone
            ? [null]
            : {
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN,
              }
        }
        mouseButtons={
          !isDone
            ? [null]
            : {
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.PAN,
              }
        }
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />

      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer
            intensity={20}
            rotation-x={Math.PI / 2}
            position={[0, 5, 9]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-2, 1, 1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, 1]}
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
    </>
  );
};

export default React.memo(Lights);

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
