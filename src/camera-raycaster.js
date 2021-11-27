import * as THREE from 'three';

import { camera } from './basic-scene';
import mouse from './World/systems/Mouse';

export const raycaster = new THREE.Raycaster();

export const intersectObjectsFromCam = (objects) => {
    raycaster.setFromCamera(mouse.position, camera);
    const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) return intersects[0];
};
