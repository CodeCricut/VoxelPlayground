import { EventDispatcher, Raycaster } from 'three';
import { MOUSE_MOVED } from './Mouse';

export const RAYCASTER_UPDATED = 'RAYCASTER_UPDATED';

class CameraRaycaster extends EventDispatcher {
    #raycaster;
    #objects;
    #mouse;
    #camera;
    constructor(camera, mouse, objects) {
        super();
        this.#raycaster = new Raycaster();
        this.#objects = objects;
        this.#mouse = mouse;
        this.#camera = camera;

        this.update();

        mouse.addEventListener(MOUSE_MOVED, () => this.update());
    }

    update() {
        this.#raycaster.setFromCamera(
            this.#mouse.positionNormalized,
            this.#camera,
        );
        this.dispatchEvent({ type: RAYCASTER_UPDATED });
    }

    getIntersects() {
        return this.#raycaster.intersectObjects(this.#objects, true);
    }

    getIntersect() {
        return this.getIntersects()[0];
    }
}

export { CameraRaycaster };
