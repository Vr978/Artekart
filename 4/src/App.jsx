import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/shiba/4.gltf', (gltfScene) => {
      loadedModel = gltfScene;

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);
// Increase ambient light intensity
gltfScene.scene.traverse((child) => {
  if (child.isMesh) {
    child.material.side = THREE.DoubleSide;
    child.material.envMapIntensity = 1; // Adjust the intensity as needed
    child.material.needsUpdate = true;
  }
});

// Increase directional light intensity
test.scene.traverse((child) => {
  if (child.isDirectionalLight) {
    child.intensity = 25; // Adjust the intensity as needed
  }
});
      test.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedModel) {
        loadedModel.scene.rotation.y += 0.01; // Rotate around the Z-axis
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
