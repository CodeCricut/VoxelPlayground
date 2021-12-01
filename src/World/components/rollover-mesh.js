import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import { COORD_HOVERED } from '../systems/MouseCoordSelector';

const createRolloverMesh = (mouseCoordSelector) => {
    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
        color: 'red',
        opacity: 0.5,
        transparent: true,
    });
    const rolloverMesh = new Mesh(geometry, material);

    document.addEventListener(COORD_HOVERED, () => {
        const selectedCoord = mouseCoordSelector.getSelectedCoord();
        rolloverMesh.position.copy(selectedCoord);
    });

    return rolloverMesh;
};

export { createRolloverMesh };
