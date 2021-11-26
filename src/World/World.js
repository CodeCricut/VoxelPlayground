import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './systems/renderer';
import { createGridHelper } from './components/grid-helper';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { createAmbientLight } from './components/ambient-light';
import { createDirectionalLights } from './components/directional.lights';
import { createCube } from './components/cube';
import { createControls } from './systems/controls';

let camera, renderer, scene, resizer, loop;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);

        const ambientLight = createAmbientLight();
        const directionalLights = createDirectionalLights();

        const gridHelper = createGridHelper(1, 16);

        const cube = createCube();
        loop.updatables.push(cube);
        scene.add(gridHelper, ambientLight, cube, directionalLights);

        console.dir(scene);

        resizer = new Resizer(container, camera, renderer);

        const controls = createControls(camera, renderer.domElement);
        controls.target.copy(cube.position);
        controls.enableDamping = true;

        // If damping is used, must call controls.update
        // If no animation loop, use controls.addEventListener('change' () => render())
        loop.updatables.push(controls);
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
