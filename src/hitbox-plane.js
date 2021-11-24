import * as THREE from 'three';
export const hitboxGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
hitboxGeometry.rotateX(-Math.PI / 2);

const hitboxPlane = new THREE.Mesh(
  hitboxGeometry,
  new THREE.MeshBasicMaterial({ visible: false }),
);

export default hitboxPlane;
