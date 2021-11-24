import * as THREE from 'three';

export const CUBE_DIMS = 50;

export const DIRT = 'DIRT',
  STONE = 'STONE',
  GRASS = 'GRASS';

const cubeGeo = new THREE.BoxBufferGeometry(CUBE_DIMS, CUBE_DIMS, CUBE_DIMS);

class Voxel extends THREE.Mesh {
  constructor(material, position = new THREE.Vector3()) {
    super(cubeGeo, material);
    this.position.copy(position);
  }

  static typeToMaterial(type) {
    const material = new THREE.MeshLambertMaterial({
      color: 0x050505,
      map: new THREE.TextureLoader().load('static/textures/square.png'),
    });

    switch (type) {
      case DIRT:
        material.color = new THREE.Color(0xfeb74c);
        break;
      case STONE:
        material.color = new THREE.Color(0xc7bbc0);
        break;
      case GRASS:
        material.color = new THREE.Color(0x239e43);
        break;
    }

    return material;
  }
}

export default Voxel;
