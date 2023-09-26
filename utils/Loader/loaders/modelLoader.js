import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

function modelLoader(file) {
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");

  gltfLoader.setDRACOLoader(dracoLoader);

  return gltfLoader.loadAsync(file);
}

export default modelLoader;

// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// function modelLoader(file) {
//   return new Promise((resolve) => {
//     const loader = new GLTFLoader();

//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath("/draco/");
//     loader.setDRACOLoader(dracoLoader);

//     try {
//       loader.loadAsync(file, (obj) => {
//         resolve(obj);
//       });
//     } catch (err) {
//       resolve(null);
//     }
//   });
// }

// export default modelLoader;
