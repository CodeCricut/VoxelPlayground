import { Raycaster } from 'three';

class CameraRaycaster {
    #raycaster;
    #objects;
    constructor(camera, mouse, objects) {
        this.#raycaster = new Raycaster();
        this.#objects = objects;
        this.#raycaster.setFromCamera(mouse.position, camera);
    }

    update(mouse, camera) {
        this.#raycaster.setFromCamera(mouse.position, camera);
    }

    getIntersects() {
        return this.#raycaster.intersectObjects(this.#objects, true);
    }

    getIntersect() {
        return this.getIntersects()[0];
    }
}

const createCameraRaycaster = (camera, mouse, objects, renderer) => {
    const cameraRaycaster = new CameraRaycaster(camera, mouse, objects);
    renderer.domElement.addEventListener(
        'mousemove',
        () => cameraRaycaster.update(mouse, camera),
        false,
    );
    return cameraRaycaster;
};

export { createCameraRaycaster };
