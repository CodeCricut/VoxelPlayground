import { EventDispatcher, Vector3 } from 'three';
import { Voxel } from '../components/Voxel';

export const VOXEL_REMOVED = 'VOXEL_REMOVED';

class VoxelRemover extends EventDispatcher {
    #voxelGroup;
    constructor(voxelGroup) {
        super();
        this.#voxelGroup = voxelGroup;
    }

    removeVoxelAtIntersect(intersect) {
        this.removeVoxel(intersect.object);
    }

    removeVoxelAtPosition(position = new Vector3()) {
        const voxel = this.#voxelGroup.getVoxelAtPosition(position);
        console.dir(voxel);
        this.removeVoxel(voxel);
    }

    removeVoxel(voxel) {
        if (voxel instanceof Voxel) {
            this.#voxelGroup.remove(voxel);
            this.dispatchEvent({ type: VOXEL_REMOVED });
        }
    }
}

export { VoxelRemover };
