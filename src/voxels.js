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
import TexturedCube, { CUBE_DIMS } from './TexturedCube';

import { snapToIntersect } from './position-helpers';

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

export const render = () => {
  renderer.render(scene, camera);
};

const onMouseMoved = (event) => {
  event.preventDefault();
  updateRolloverLocation();
  render();
};

const onMouseDown = (event) => {
  event.preventDefault();
  addOrRemoveVoxel();
  render();
};

const addOrRemoveVoxel = () => {
  const intersect = intersectObjectsFromCam(collidables);

  // Remove obj if holding shift
  if (keyboard.isShiftDown && intersect.object !== hitboxPlane)
    removeObjectAtIntersect(intersect);
  else addVoxelAtIntersect(intersect);
};

const addVoxelAtIntersect = (intersect) => {
  if (!intersect) return;
  const voxel = new TexturedCube();
  snapToIntersect(voxel, intersect);
  addCollidableToScene(voxel);
};

const removeObjectAtIntersect = (intersect) => {
  removeCollidableFromScene(intersect.object);
};

const updateRolloverLocation = () => {
  const intersect = intersectObjectsFromCam(collidables);
  if (intersect) snapToIntersect(rolloverMesh, intersect);
};
