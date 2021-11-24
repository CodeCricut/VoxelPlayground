import * as THREE from 'three';
import { onDocumentKeyDown, onDocumentKeyUp, keyboard } from './keyboard';
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

import mouse, { MOUSE_MOVED, MOUSE_DOWN } from './mouse';

let raycaster;

let cubeGeo, cubeMaterial;

export const init = () => {
  // Add the rollover mesh at the origin
  scene.add(rolloverMesh);

  cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
  cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xfeb74c,
    map: new THREE.TextureLoader().load('static/textures/square.png'),
  });

  let gridHelper = new THREE.GridHelper(1000, 20);
  scene.add(gridHelper);

  raycaster = new THREE.Raycaster();

  addCollidableToScene(hitboxPlane);

  let ambientLight = new THREE.AmbientLight(0x606060);
  scene.add(ambientLight);

  let directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 0.75, 0.5).normalize();
  scene.add(directionalLight);

  document.addEventListener(MOUSE_MOVED, onMouseMoved, false);
  document.addEventListener(MOUSE_DOWN, onMouseDown, false);
  document.addEventListener('keydown', onDocumentKeyDown, false);
  document.addEventListener('keyup', onDocumentKeyUp, false);
  window.addEventListener('resize', onWindowResize, false);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onMouseMoved = (event) => {
  event.preventDefault();

  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(collidables);

  if (intersects.length > 0) {
    let intersect = intersects[0];

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
  }

  render();
};

const onMouseDown = (event) => {
  event.preventDefault();

  // Get position of clicked obj
  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(collidables);

  if (intersects.length > 0) {
    let intersect = intersects[0];

    // Remove obj if holding shift
    if (keyboard.isShiftDown) {
      if (intersect.object !== hitboxPlane) {
        removeCollidableFromScene(intersect.object);
      }
    } else {
      // create new voxel
      let voxel = new THREE.Mesh(cubeGeo, cubeMaterial);

      // position on grid
      voxel.position.copy(intersect.point).add(intersect.face.normal);
      voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

      addCollidableToScene(voxel);
    }

    render();
  }
};

export const render = () => {
  renderer.render(scene, camera);
};
