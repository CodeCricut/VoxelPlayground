import { Voxel } from '../components/Voxel';
import { MOUSE_UP } from './Mouse';

const createVoxelRemover = () => {
    const removeVoxel = (intersect, voxelParent) => {
        const obj = intersect.object;
        if (obj instanceof Voxel) {
            voxelParent.remove(obj);
        }
    };

    const voxelRemover = {
        voxelRemoved: () => {},
        removeVoxel: removeVoxel,
    };

    return voxelRemover;
};

export { createVoxelRemover };
