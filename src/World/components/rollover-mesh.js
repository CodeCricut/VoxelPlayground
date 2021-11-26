import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';

const createRolloverMesh = () => {
    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = MeshBasicMaterial({
        color: 'red',
        opacity: 0.5,
        transparent: true,
    });
    return new Mesh(geometry, material);
};

export { createRolloverMesh };
