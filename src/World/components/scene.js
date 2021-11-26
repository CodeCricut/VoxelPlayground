import { Color, Scene } from 'three';

function createScene() {
    const scene = new Scene();

    scene.background = new Color('gray');

    return scene;
}

export { createScene };
