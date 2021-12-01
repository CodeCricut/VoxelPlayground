import { COORD_SHIFT_CLICKED } from './MouseCoordSelector';

const removeVoxelOnShiftClick = (
    mouseCoordSelector,
    voxelGroup,
    voxelRemover,
) => {
    document.addEventListener(COORD_SHIFT_CLICKED, () => {
        const intersect = mouseCoordSelector.getIntersect();
        voxelRemover.removeVoxel(intersect, voxelGroup);
    });
};

export { removeVoxelOnShiftClick };
