import { Voxel } from '../components/Voxel';
import { DIRT } from '../utility/voxel-types';
import { MOUSE_UP } from './Mouse';
import { COORD_SELECTED } from './MouseCoordSelector';

const VOXEL_ADDED = 'VOXEL_ADDED';

const createVoxelAdder = (
    mouse,
    keyboard,
    mouseCoordSelector,
    voxelParent,
    voxelFactory,
) => {
    const voxelAdder = {
        voxelAdded: () => {},
    };

    const addVoxel = (coord, voxelParent) => {
        const voxel = voxelFactory.createVoxel(DIRT, coord);
        voxelParent.add(voxel);
    };

    document.addEventListener(MOUSE_UP, () => {
        if (!mouse.isDragging && !keyboard.isShiftDown) {
            const selectedCoord = mouseCoordSelector.getSelectedCoord();
            addVoxel(selectedCoord, voxelParent);
            voxelAdder.voxelAdded();
        }
    });

    return voxelAdder;
};

export { createVoxelAdder };
