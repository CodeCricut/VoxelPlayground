import { EventDispatcher } from 'three';
import { COORD_CLICKED } from './MouseCoordSelector';

export const VOXEL_ADDED_BY_MOUSE = 'VOXEL_ADDED_BY_MOUSE';

class MouseVoxelAdder extends EventDispatcher {
    constructor(mouseCoordSelector, voxelAdder) {
        super();

        mouseCoordSelector.addEventListener(COORD_CLICKED, () => {
            const selectedCoord = mouseCoordSelector.getSelectedCoord();
            voxelAdder.addVoxel(selectedCoord);

            this.dispatchEvent({ type: VOXEL_ADDED_BY_MOUSE });
        });
    }
}

export { MouseVoxelAdder };
