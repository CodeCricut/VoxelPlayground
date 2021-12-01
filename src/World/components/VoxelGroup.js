import { Group } from 'three';
import { ObjectMap } from '../systems/ObjectMap';

class VoxelGroup extends Group {
    #voxelMap;
    constructor() {
        super();
        this.#voxelMap = new ObjectMap();
    }

    add(...voxels) {
        for (const voxel of voxels) {
            this.#voxelMap.addObject(voxel);
        }
        super.add(...voxels);
    }

    remove(...voxels) {
        for (const voxel of voxels) {
            this.#voxelMap.removeObject(voxel);
        }
        super.remove(...voxels);
    }

    getVoxels() {
        return this.#voxelMap.getObjects();
    }

    getVoxelAtPosition(position) {
        return this.#voxelMap.getObjectAtPosition(position);
    }

    removeVoxelAtPosition(position) {
        this.#voxelMap.removeObjectAtPosition(position);
    }
}

export { VoxelGroup };
