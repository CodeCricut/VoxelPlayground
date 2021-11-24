import * as THREE from 'three';

export const CUBE_DIMS = 50;

const cubeGeo = new THREE.BoxBufferGeometry(CUBE_DIMS, CUBE_DIMS, CUBE_DIMS);
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xfeb74c,
  map: new THREE.TextureLoader().load('static/textures/square.png'),
});

class TexturedCube extends THREE.Mesh {
  constructor(position = new THREE.Vector3()) {
    super(cubeGeo, cubeMaterial);
    this.position.copy(position);
  }
}

export default TexturedCube;
