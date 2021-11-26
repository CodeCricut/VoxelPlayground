import * as THREE from 'three';
import keyboard from './keyboard';

import {
    camera,
    scene,
    renderer,
    collidables,
    addCollidableToScene,
    removeCollidableFromScene,
} from './basic-scene';
import hitboxPlane from './hitbox-plane';
import rolloverMesh from './rollover-mesh';
import { intersectObjectsFromCam } from './camera-raycaster';

import mouse, { MOUSE_MOVED, MOUSE_DOWN, MOUSE_UP } from './mouse';
import Voxel, { CUBE_DIMS, DIRT, STONE } from './Voxel';

import { snapToIntersect } from './position-helpers';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { selectedMaterialType, selectMaterialType } from './material-selector';

import Loop from './Loop';
import Pig, { PIG } from './Pig';

const controls = new OrbitControls(camera, renderer.domElement);

let loop;
export const init = () => {
    loop = new Loop(camera, scene, renderer);
    // const pig = new Pig(new THREE.Vector3(CUBE_DIMS, CUBE_DIMS, CUBE_DIMS));
    // scene.add(pig);
    // addCollidableToScene(pig);
    // loop.updatables.push(pig);

    scene.add(rolloverMesh);

    const gridHelper = new THREE.GridHelper(1000, 20);
    scene.add(gridHelper);

    addCollidableToScene(hitboxPlane);

    let ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    controls.maxPolarAngle = Math.PI / 2 - 10 * (Math.PI / 180);
    controls.update();

    document.addEventListener(MOUSE_MOVED, onMouseMoved, false);
    document.addEventListener(MOUSE_UP, onMouseUp, false);
};

export const render = () => {
    loop.start();
    // renderer.render(scene, camera);
};

const onMouseMoved = (event) => {
    event.preventDefault();
    updateRolloverLocation();
    render();
};

const onMouseUp = (event) => {
    event.preventDefault();
    if (!mouse.isDragging) addOrRemoveVoxel();
    render();
};

const addOrRemoveVoxel = () => {
    const intersect = intersectObjectsFromCam(collidables);
    // Remove obj if holding shift
    if (intersect && intersect.object) {
        if (keyboard.isShiftDown) {
            if (intersect.object !== hitboxPlane)
                removeCollidableFromScene(intersect.object);
        } else addVoxelAtIntersect(intersect);
    }
};

const addVoxelAtIntersect = (intersect) => {
    if (!intersect) return;
    // TODO: this is quick-and-dirty code, should be fixed after complete refactor of app
    console.log(selectMaterialType);
    if (selectedMaterialType === PIG) {
        console.log('placing pig');
        const pig = new Pig(new THREE.Vector3(CUBE_DIMS, CUBE_DIMS, CUBE_DIMS));
        snapToIntersect(pig, intersect);
        scene.add(pig);
        loop.updatables.push(pig);
    } else {
        const voxel = new Voxel(Voxel.typeToMaterial(selectedMaterialType));
        snapToIntersect(voxel, intersect);
        addCollidableToScene(voxel);
    }
};

const updateRolloverLocation = () => {
    const intersect = intersectObjectsFromCam(collidables);
    if (intersect) snapToIntersect(rolloverMesh, intersect);
};

const onWindowResize = () => {
    controls.update();
};

window.addEventListener('resize', onWindowResize, false);
