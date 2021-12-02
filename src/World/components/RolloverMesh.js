import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import { COORD_HOVERED } from '../systems/MouseCoordSelector';

const createMaterial = () => {
    const material = new MeshBasicMaterial({
        color: 'red',
        opacity: 0.5,
        transparent: true,
    });
    return material;
};

class RolloverMesh extends Mesh {
    constructor(mouseCoordSelector) {
        const geometry = new BoxBufferGeometry(1, 1, 1);
        const material = createMaterial();
        super(geometry, material);

        mouseCoordSelector.addEventListener(COORD_HOVERED, () => {
            this.position.copy(mouseCoordSelector.getSelectedCoord());
        });
    }
}

export { RolloverMesh };
