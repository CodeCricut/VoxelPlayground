import { PerspectiveCamera } from 'three';

const createCamera = () => {
    const fov = 45;
    const aspect = 1; // Dummy value, will be set by Resizer.js
    const near = 0.1,
        far = 100000000;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    return camera;
};

export { createCamera };
