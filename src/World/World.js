import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './systems/Renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';

let camera, renderer, scene, resizer, loop;

class World {
    constructor(container) {
        renderer = createRenderer(container);
        camera = createCamera();
        scene = createScene();

        resizer = new Resizer(container, camera, renderer);

        loop = new Loop(camera, scene, renderer);
    }

    render() {
        renderer.render();
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };
