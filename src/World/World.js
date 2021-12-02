import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './systems/renderer';
import { createHemisphereLight } from './components/hemisphere-light';
import { createDirectionalLights } from './components/directional-lights';
import { createControls } from './systems/controls';
import { createCoordinateBasis } from './components/coordinate-basis';

import { VoxelGroup } from './components/VoxelGroup';
import { Collidables } from './systems/collidables';
import { createHitboxPlane } from './components/hitbox-plane';
import { createSkyDome } from './components/sky-dome';
import { createGround } from './components/ground';

import { Loop } from './systems/Loop';
import { Resizer } from './systems/Resizer';
import { Mouse } from './systems/Mouse';
import { Keyboard } from './systems/Keyboard';
import { CameraRaycaster } from './systems/CameraRaycaster';
import { MouseCoordSelector } from './systems/MouseCoordSelector';
import { VoxelAdder } from './systems/VoxelAdder';
import { MouseVoxelAdder } from './systems/MouseVoxelAdder';
import { MaterialSelector } from './systems/MaterialSelector';
import { VoxelRemover } from './systems/VoxelRemover';
import { MouseVoxelRemover } from './systems/MouseVoxelRemover';
import { RolloverMesh } from './components/RolloverMesh';

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
        const directionalLights = createDirectionalLights();
        const hemisphereLight = createHemisphereLight();
        const skyDome = createSkyDome();

        scene.add(hemisphereLight, coordBasis, directionalLights, skyDome);

        // Collidables
        const collidables = new Collidables();

        // Mouse and keyboard
        const mouse = new Mouse();
        const keyboard = new Keyboard();

        // Hitbox plane
        const hitboxPlane = createHitboxPlane();
        scene.add(hitboxPlane);
        collidables.addCollidables(hitboxPlane);

        // Voxel parent
        const voxelGroup = new VoxelGroup();
        coordBasis.add(voxelGroup);
        collidables.addCollidables(voxelGroup);

        // Ground
        const ground = createGround();
        ground.position.y = -1;
        coordBasis.add(ground);
        collidables.addCollidables(ground);

        // Camera raycaster
        const cameraRaycaster = new CameraRaycaster(
            this.#camera,
            mouse,
            collidables.collidables,
        );

        // Coord selector
        const mouseCoordSelector = new MouseCoordSelector(
            cameraRaycaster,
            mouse,
            keyboard,
        );

        // Rollover mesh
        const rolloverMesh = new RolloverMesh(mouseCoordSelector);
        coordBasis.add(rolloverMesh);

        // Material selector
        const materialSelector = new MaterialSelector();

        // Voxel adder
        const voxelAdder = new VoxelAdder(voxelGroup, materialSelector);
        const mouseVoxelAdder = new MouseVoxelAdder(
            mouseCoordSelector,
            voxelAdder,
        );

        // Voxel remover
        const voxelRemover = new VoxelRemover(voxelGroup);
        const mouseVoxelRemover = new MouseVoxelRemover(
            mouseCoordSelector,
            voxelRemover,
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
