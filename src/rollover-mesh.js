import * as THREE from 'three';

import { CUBE_DIMS } from './TexturedCube';

const rolloverGeo = new THREE.BoxBufferGeometry(
  CUBE_DIMS,
  CUBE_DIMS,
  CUBE_DIMS,
);
const rolloverMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  opacity: 0.5,
  transparent: true,
});
const rolloverMesh = new THREE.Mesh(rolloverGeo, rolloverMaterial);

export default rolloverMesh;
