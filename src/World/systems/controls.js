import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createControls = (camera, canvas, target) => {
    const controls = new OrbitControls(camera, canvas);

    controls.tick = (delta) => {
        controls.update();
    };
    controls.enableDamping = true;
    controls.target.copy(target);

    return controls;
};

export { createControls };
