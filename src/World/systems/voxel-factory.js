import { Vector3 } from 'three';
import { Voxel } from '../components/Voxel';
import { createVoxelMaterialConverter } from '../systems/voxel-material-converter';

const createVoxelFactory = (renderer) => {
    const converter = createVoxelMaterialConverter(renderer);

    const createVoxel = (type, position = new Vector3()) => {
        const material = converter.typeToMaterial(type);
        return new Voxel(position, material);
    };

    const voxelFactory = {
        createVoxel: createVoxel,
    };

    return voxelFactory;
};

export { createVoxelFactory };
