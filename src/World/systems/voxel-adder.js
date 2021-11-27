import { Voxel } from '../components/Voxel';
import { MOUSE_UP } from './Mouse';
import { COORD_SELECTED } from './MouseCoordSelector';

const VOXEL_ADDED = 'VOXEL_ADDED';

const addVoxel = (coord, voxelParent) => {
    const voxel = new Voxel(coord);
    voxelParent.add(voxel);
};

const createVoxelAdder = (mouse, mouseCoordSelector, voxelParent) => {
    const voxelAdder = {
        voxelAdded: () => {},
    };

    document.addEventListener(MOUSE_UP, () => {
        if (!mouse.isDragging) {
            const selectedCoord = mouseCoordSelector.getSelectedCoord();
            addVoxel(selectedCoord, voxelParent);
            voxelAdder.voxelAdded();
        }
    });

    return voxelAdder;
};

export { createVoxelAdder };
