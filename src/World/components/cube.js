import {
    BoxBufferGeometry,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
} from 'three';

const createMaterial = () => {
    const material = new MeshStandardMaterial({
        color: 'purple',
    });
    return material;
};

const createCube = () => {
    // create a geometry
    const geometry = new BoxBufferGeometry(2, 2, 2);

    const material = createMaterial();

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    // Rotate the cube to observe shading
    cube.rotation.set(-0.5, -0.1, 0.8);

    const radsPerSec = MathUtils.degToRad(30);

    // Rotate the cube
    cube.tick = (delta) => {
        const rotChange = radsPerSec * delta;
        cube.rotation.x += rotChange;
        cube.rotation.y += rotChange;
        cube.rotation.z += rotChange;
    };

    return cube;
};

export { createCube };
