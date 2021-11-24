import * as THREE from 'three';

const rolloverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
const rolloverMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  opacity: 0.5,
  transparent: true,
});
const rolloverMesh = new THREE.Mesh(rolloverGeo, rolloverMaterial);

export default rolloverMesh;
