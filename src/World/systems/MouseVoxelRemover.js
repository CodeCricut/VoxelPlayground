import { EventDispatcher } from 'three';
import { COORD_SHIFT_CLICKED } from './MouseCoordSelector';

export const VOXEL_REMOVED_BY_MOUSE = 'VOXEL_REMOVED_BY_MOUSE';

class MouseVoxelRemover extends EventDispatcher {
    constructor(mouseCoordSelector, voxelRemover) {
        super();

        mouseCoordSelector.addEventListener(COORD_SHIFT_CLICKED, () => {
            const selectedIntersect = mouseCoordSelector.getIntersect();
            voxelRemover.removeVoxel(selectedIntersect.object);
            this.dispatchEvent({ type: VOXEL_REMOVED_BY_MOUSE });
        });
    }
}

export { MouseVoxelRemover };
