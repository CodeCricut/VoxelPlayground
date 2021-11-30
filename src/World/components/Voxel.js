import { BoxBufferGeometry, Mesh, Vector3 } from 'three';

const createGeometry = () => {
    return new BoxBufferGeometry(1, 1, 1);
};

class Voxel extends Mesh {
    constructor(position = new Vector3(), material) {
        const geometry = createGeometry();
        super(geometry, material);
        this.position.copy(position);
    }
}

export { Voxel };
