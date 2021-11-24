import * as THREE from 'three';
import { objects as collidables, addObject, removeObject } from './objects';

const canvas = document.getElementById('three-canvas');
const aspectRatio = canvas.clientWidth / canvas.clientHeight;

const camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000);
camera.position.set(500, 800, 1300);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const addCollidableToScene = (collidable) => {
  scene.add(collidable);
  addObject(collidable);
};

const removeCollidableFromScene = (collidable) => {
  scene.remove(collidable);
  removeObject(collidable);
};

const onWindowResize = () => {
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
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
