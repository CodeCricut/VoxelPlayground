import { Voxel } from '../components/Voxel';
import { MOUSE_UP } from './Mouse';

const removeVoxel = (intersect, voxelParent) => {
    const obj = intersect.object;
    if (obj instanceof Voxel) {
        voxelParent.remove(obj);
    }
};

const createVoxelRemover = (
    mouse,
    keyboard,
    mouseCoordSelector,
    voxelParent,
) => {
    const voxelRemover = {
        voxelRemoved: () => {},
    };

    document.addEventListener(MOUSE_UP, () => {
        if (!mouse.isDragging && keyboard.isShiftDown) {
            const intersect = mouseCoordSelector.getIntersect();
            removeVoxel(intersect, voxelParent);
            voxelRemover.voxelRemoved();
        }
    });

    return voxelRemover;
};

export { createVoxelRemover };
