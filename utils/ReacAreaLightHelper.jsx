import React from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

const RectArealightWithHelper = ({
  position = [0, -5, 0],
  color,
  intensity,
  scale = { x: 0.1, y: 0.1, z: 0.1 },
  rotation = { x: 0, y: 0, z: 0 },
  isHelper = true,
  isLookAt,
}) => {
  // Besides the useThree hook, all of this is taken straight from one of the examples on threejs.org: https://threejs.org/examples/#webgl_lights_rectarealight.

  const { scene } = useThree();

  // This somehow changes the texture of the ground-plane and makes it more shiny? Very interesting
  React.useEffect(() => {
    RectAreaLightUniformsLib.init();
    const rectLight = new THREE.RectAreaLight(color, scale.x, scale.y, scale.z);
    if (intensity) {
      rectLight.intensity = intensity;
    }
    if (isLookAt) {
      rectLight.lookAt(isLookAt[0], isLookAt[1], isLookAt[2]);
    }
    rectLight.rotation.set(rotation.x, rotation.y, rotation.z);
    rectLight.position.set(position[0], position[1], position[2]);
    scene.add(rectLight);
    if (isHelper) {
      scene.add(new RectAreaLightHelper(rectLight));
    }
  }, [position, scale, isHelper, rotation]);

  return null;
};

export default React.memo(RectArealightWithHelper);
