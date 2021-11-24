import * as THREE from 'three';
import { objects, addObject, removeObject } from './objects';

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

const addObjectToScene = (obj) => {
  scene.add(obj);
  addObject(obj);
};

const removeObjectFromScene = (obj) => {
  scene.remove(obj);
  removeObject(obj);
};

export {
  camera,
  scene,
  renderer,
  objects,
  addObjectToScene,
  removeObjectFromScene,
};
