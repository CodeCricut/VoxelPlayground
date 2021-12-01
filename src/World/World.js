import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './systems/renderer';
import { createGridHelper } from './components/grid-helper';
import { RESIZED, Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { createAmbientLight } from './components/ambient-light';
import { createHemisphereLight } from './components/hemisphere-light';
import { createDirectionalLights } from './components/directional-lights';
import { createCube } from './components/cube';
import { createControls } from './systems/controls';
import { createCoordinateBasis } from './components/coordinate-basis';
import { Voxel } from './components/Voxel';
import { ObjectMap } from './systems/ObjectMap';
import { Raycaster, Vector3 } from 'three';
import {
    COORD_SELECTED,
    createMouseCoordSelector,
} from './systems/MouseCoordSelector';
import { createRolloverMesh } from './components/rollover-mesh';
import { createCameraRaycaster } from './systems/CameraRaycaster';
import { VoxelGroup } from './components/VoxelGroup';
import { Collidables } from './systems/collidables';
import { createHitboxPlane } from './components/hitbox-plane';
import { createVoxelAdder } from './systems/voxel-adder';
import { addVoxelOnClick } from './systems/mouse-voxel-adder';
import { removeVoxelOnShiftClick } from './systems/mouse-voxel-remover';
import { createKeyboard } from './systems/Keyboard';
import { createVoxelRemover } from './systems/voxel-remover';
import { createVoxelFactory } from './systems/voxel-factory';
import { DIRT } from './utility/voxel-types';
import { createSkyDome } from './components/sky-dome';
import { createGround } from './components/ground';

import { Mouse } from './systems/Mouse';
import { Keyboard } from './systems/Keyboard';

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

        // Mouse and keyboard
        const mouse = new Mouse();
        const keyboard = new Keyboard();

        // Collidables
        const collidables = new Collidables();

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
        const cameraRaycaster = createCameraRaycaster(
            this.#camera,
            mouse,
            collidables.collidables,
            this.#renderer,
        );

        // Voxel factory
        const voxelFactory = createVoxelFactory(this.#renderer);

        // Test voxel
        const voxel = voxelFactory.createVoxel(DIRT);
        voxelGroup.add(voxel);

        // Coord selector
        const mouseCoordSelector = createMouseCoordSelector(
            cameraRaycaster,
            mouse,
            keyboard,
        );

        // Rollover mesh
        const rolloverMesh = createRolloverMesh(mouseCoordSelector);
        coordBasis.add(rolloverMesh);

        // Voxel adder
        const voxelAdder = createVoxelAdder(voxelFactory);
        addVoxelOnClick(mouseCoordSelector, voxelGroup, voxelAdder);

        const voxelRemover = createVoxelRemover(
            mouse,
            keyboard,
            mouseCoordSelector,
            voxelGroup,
        );
        removeVoxelOnShiftClick(mouseCoordSelector, voxelGroup, voxelRemover);

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
