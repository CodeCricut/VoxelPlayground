import { COORD_CLICKED } from './MouseCoordSelector';

const addVoxelOnClick = (mouseCoordSelector, voxelGroup, voxelAdder) => {
    document.addEventListener(COORD_CLICKED, () => {
        const selectedCoord = mouseCoordSelector.getSelectedCoord();
        voxelAdder.addVoxel(selectedCoord, voxelGroup);
    });
};

export { addVoxelOnClick };
