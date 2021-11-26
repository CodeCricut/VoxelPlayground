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
import { createCoordinateBasis } from './components/coordinate-basis';
import { Voxel } from './components/Voxel';
import { ObjectMap } from './systems/ObjectMap';
import { Vector3 } from 'three';

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

        const objectMap = new ObjectMap();
        const coordBasis = createCoordinateBasis();
        const voxel = new Voxel(new Vector3(1, 0, 1));
        coordBasis.add(voxel);
        objectMap.addObject(voxel);

        scene.add(gridHelper, ambientLight, coordBasis, directionalLights);

        resizer = new Resizer(container, camera, renderer);

        const controls = createControls(camera, renderer.domElement);
        controls.target.copy(coordBasis.position);
        controls.enableDamping = true;

        // If damping is used, must call controls.update
        // If no animation loop, use controls.addEventListener('change' () => render())
        loop.updatables.push(controls);

        console.dir(objectMap.getObjectAtPosition(new Vector3(0, 0, 0)));
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
