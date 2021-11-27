import { Object3D } from 'three';
import { createCoordinateBasis } from './coordinate-basis';
import { ObjectMap } from '../systems/ObjectMap';
const coordBasis = createCoordinateBasis();
const voxelMap = new ObjectMap();

class VoxelParent extends Object3D {
    constructor() {
        super();
    }
    add(...voxels) {
        for (const voxel of voxels) {
            voxelMap.addObject(voxel);
        }
        super.add(...voxels);
    }
}

export { VoxelParent };
