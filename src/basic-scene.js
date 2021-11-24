import * as THREE from 'three';
import { objects as collidables, addObject, removeObject } from './objects';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000,
);
camera.position.set(500, 800, 1300);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2 - 10 * (Math.PI / 180);
controls.update();

const addCollidableToScene = (collidable) => {
  scene.add(collidable);
  addObject(collidable);
};

const removeCollidableFromScene = (collidable) => {
  scene.remove(collidable);
  removeObject(collidable);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize, false);

export {
  camera,
  scene,
  renderer,
  collidables,
  addCollidableToScene,
  removeCollidableFromScene,
};
