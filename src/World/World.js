import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './systems/renderer';
import { createGridHelper } from './components/grid-helper';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { createAmbientLight } from './components/ambient-light';
import { createDirectionalLights } from './components/directional-lights';
import { createCube } from './components/cube';
import { createControls } from './systems/controls';
import { createCoordinateBasis } from './components/coordinate-basis';
import { Voxel } from './components/Voxel';
import { ObjectMap } from './systems/ObjectMap';
import { Raycaster, Vector3 } from 'three';
import { createMouse, MOUSE_MOVED } from './systems/Mouse';
import {
    COORD_SELECTED,
    createMouseCoordSelector,
} from './systems/MouseCoordSelector';
import { createRolloverMesh } from './components/rollover-mesh';
import { createCameraRaycaster } from './systems/CameraRaycaster';
import { VoxelParent } from './components/VoxelParent';
import { Collidables } from './systems/collidables';
import { createHitboxPlane } from './components/hitbox-plane';
import { createVoxelAdder } from './systems/voxel-adder';
import { createKeyboard } from './systems/keyboard';
import { createVoxelRemover } from './systems/voxel-remover';

class World {
    #camera;
    #renderer;
    #loop;

    constructor(container) {
        // Scene stuff
        this.#camera = createCamera();
        const scene = createScene();

        this.#renderer = createRenderer();
        container.append(this.#renderer.domElement);

        // Loop
        this.#loop = new Loop(this.#camera, scene, this.#renderer);

        // Resizer
        const resizer = new Resizer(container, this.#camera, this.#renderer);

        // Coord basis
        const coordBasis = createCoordinateBasis();

        // Non-voxel items
        const gridHelper = createGridHelper(1, 16);
        const directionalLights = createDirectionalLights();
        const ambientLight = createAmbientLight();

        scene.add(gridHelper, ambientLight, coordBasis, directionalLights);

        // Mouse and keyboard
        const mouse = createMouse();
        const keyboard = createKeyboard();

        // Collidables
        const collidables = new Collidables();

        // Hitbox plane
        const hitboxPlane = createHitboxPlane();
        scene.add(hitboxPlane);
        collidables.addCollidables(hitboxPlane);

        // Voxel parent
        const voxelParent = new VoxelParent();
        coordBasis.add(voxelParent);
        collidables.addCollidables(voxelParent);

        // Camera raycaster
        const cameraRaycaster = createCameraRaycaster(
            this.#camera,
            mouse,
            collidables.collidables,
            this.#renderer,
        );

        // Test voxel
        const voxel = new Voxel(new Vector3(0, 0, 0));
        voxelParent.add(voxel);

        // Coord selector
        const mouseCoordSelector = createMouseCoordSelector(cameraRaycaster);

        // Rollover mesh
        const rolloverMesh = createRolloverMesh(mouseCoordSelector);
        coordBasis.add(rolloverMesh);

        // Voxel adder
        const voxelAdder = createVoxelAdder(
            mouse,
            keyboard,
            mouseCoordSelector,
            voxelParent,
        );

        const voxelRemover = createVoxelRemover(
            mouse,
            keyboard,
            mouseCoordSelector,
            voxelParent,
        );

        // Controls
        const controls = createControls(
            this.#camera,
            this.#renderer.domElement,
            coordBasis.position,
        );
        this.#loop.updatables.push(controls);
    }

    render() {
        this.#renderer.render();
    }

    start() {
        this.#loop.start();
    }

    stop() {
        this.#loop.stop();
    }
}

export { World };
