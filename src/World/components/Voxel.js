import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    TextureLoader,
    Vector3,
} from 'three';
import uvTestImg from '../../../static/textures/uv-test-bw.png';

const textureLoader = new TextureLoader();

const createGeometry = () => {
    return new BoxBufferGeometry(1, 1, 1);
};

const createMaterial = () => {
    const texture = textureLoader.load(uvTestImg);

    return new MeshStandardMaterial({
        map: texture,
        color: 'purple',
    });
};

class Voxel extends Mesh {
    constructor(position = new Vector3()) {
        const geometry = createGeometry();
        const material = createMaterial();
        super(geometry, material);
        this.position.copy(position);
    }
}

export { Voxel };
