import { PerspectiveCamera } from 'three';

const createCamera = () => {
    const fov = 60;
    const aspect = 1; // Dummy value, will be set by Resizer.js
    const near = 0.1,
        far = 2000;
    const camera = new PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 0, 10);

    return camera;
};

export { createCamera };
