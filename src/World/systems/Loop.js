import { Clock, EventDispatcher } from 'three';

export const LOOP_STARTED = 'LOOP_STARTED',
    LOOP_ENDED = 'LOOP_ENDED';

class Loop extends EventDispatcher {
    #clock;
    #camera;
    #scene;
    #renderer;
    updatables;

    constructor(camera, scene, renderer) {
        super();
        this.#clock = new Clock();
        this.#camera = camera;
        this.#scene = scene;
        this.#renderer = renderer;

        this.updatables = [];
    }

    start() {
        this.#renderer.setAnimationLoop(() => {
            this.#renderer.render(this.#scene, this.#camera);
            this.tick();
        });
        this.dispatchEvent({ type: LOOP_STARTED });
    }

    end() {
        this.#renderer.setAnimationLoop(null);
        this.dispatchEvent({ type: LOOP_ENDED });
    }

    tick() {
        const delta = this.#clock.getDelta();
        for (const obj of this.updatables) {
            obj.tick(delta);
        }
    }
}

export { Loop };
