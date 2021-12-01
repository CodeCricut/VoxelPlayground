import { MOUSE_UP } from './Mouse';

const createMouseVoxelAdder = (
    mouse,
    keyboard,
    mouseCoordSelector,
    voxelGroup,
    voxelAdder,
) => {
    document.addEventListener(MOUSE_UP, () => {
        if (!mouse.isDragging && !keyboard.isShiftDown) {
            const selectedCoord = mouseCoordSelector.getSelectedCoord();
            voxelAdder.addVoxel(selectedCoord, voxelGroup);
        }
    });

    return voxelAdder;
};

export { createMouseVoxelAdder };
