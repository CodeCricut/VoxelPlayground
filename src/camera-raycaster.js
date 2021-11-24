import * as THREE from 'three';

import { camera } from './basic-scene';
import mouse from './mouse';

export const raycaster = new THREE.Raycaster();

export const intersectObjectsFromCam = (objects) => {
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObjects(objects);
};
