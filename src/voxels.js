import * as THREE from 'three';
import keyboard from './keyboard';

import {
  camera,
  scene,
  renderer,
  collidables,
  addCollidableToScene,
  removeCollidableFromScene,
} from './basic-scene';
import './modal';
import hitboxPlane from './hitbox-plane';
import rolloverMesh from './rollover-mesh';
import { intersectObjectsFromCam } from './camera-raycaster';

import { MOUSE_MOVED, MOUSE_DOWN } from './mouse';
import TexturedCube from './TexturedCube';

export const init = () => {
  scene.add(rolloverMesh);

  const gridHelper = new THREE.GridHelper(1000, 20);
  scene.add(gridHelper);

  addCollidableToScene(hitboxPlane);

  let ambientLight = new THREE.AmbientLight(0x606060);
  scene.add(ambientLight);

  let directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 0.75, 0.5).normalize();
  scene.add(directionalLight);

  document.addEventListener(MOUSE_MOVED, onMouseMoved, false);
  document.addEventListener(MOUSE_DOWN, onMouseDown, false);
};

const onMouseMoved = (event) => {
  event.preventDefault();

  updateRolloverLocation();

  render();
};

const onMouseDown = (event) => {
  event.preventDefault();

  // Get position of clicked obj
  const intersect = intersectObjectsFromCam(collidables);
  if (!intersect) return;

  // Remove obj if holding shift
  if (keyboard.isShiftDown) {
    if (intersect.object !== hitboxPlane) {
      removeCollidableFromScene(intersect.object);
    }
  } else {
    let voxel = new TexturedCube();

    // position on grid
    voxel.position.copy(intersect.point).add(intersect.face.normal);
    voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

    addCollidableToScene(voxel);
  }

  render();
};

export const render = () => {
  renderer.render(scene, camera);
};

const updateRolloverLocation = () => {
  const intersect = intersectObjectsFromCam(collidables);
  if (!intersect) return;

  // Move the rollover mesh to where the position the mouse is pointing
  rolloverMesh.position
    .copy(intersect.point)
    // Ensure that it is positioned towards the camera, not on the opposite face
    .add(intersect.face.normal);

  // position on grid
  rolloverMesh.position
    // Round to nearest 50 units
    .divideScalar(50)
    .floor()
    .multiplyScalar(50)
    // Position away from vertices, in the cube
    .addScalar(25);
};
