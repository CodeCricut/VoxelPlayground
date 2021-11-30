import { Object3D, Group } from 'three';
import { createCoordinateBasis } from './coordinate-basis';
import { ObjectMap } from '../systems/ObjectMap';
const coordBasis = createCoordinateBasis();
const voxelMap = new ObjectMap();

// TODO: rename to VoxelGroup and either extend from Group or just return a Group
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

    remove(...voxels) {
        for (const voxel of voxels) {
            voxelMap.removeObject(voxel);
        }
        super.remove(...voxels);
    }
}

export { VoxelParent };
