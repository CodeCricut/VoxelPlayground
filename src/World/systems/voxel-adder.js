import { selectedMaterialType } from './material-selector';

const VOXEL_ADDED = 'VOXEL_ADDED';

const createVoxelAdder = (voxelFactory) => {
    const addVoxel = (coord, voxelParent) => {
        const voxel = voxelFactory.createVoxel(selectedMaterialType, coord);
        voxelParent.add(voxel);
        voxelAdder.voxelAdded();
    };

    const voxelAdder = {
        addVoxel: addVoxel,
        voxelAdded: () => {},
    };

    return voxelAdder;
};

export { createVoxelAdder };
