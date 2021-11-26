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
    const geometry = new BoxBufferGeometry(1, 1, 1);

    const material = createMaterial();

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    return cube;
};

export { createCube };
