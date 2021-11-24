import * as THREE from 'three';

const cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
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
