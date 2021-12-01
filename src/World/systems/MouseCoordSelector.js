import { MOUSE_MOVED, MOUSE_UP, MOUSE_DOWN } from './Mouse';
import { Object3D, RedIntegerFormat, Vector3 } from 'three';

export const COORD_HOVERED = 'COORD_HOVERED',
    COORD_CLICKED = 'COORD_CLICKED',
    COORD_SHIFT_CLICKED = 'COORD_SHIFT_CLICKED';

class MouseCoordSelector {
    #cameraRaycaster;
    #mouse;
    constructor(cameraRaycaster, mouse) {
        this.#cameraRaycaster = cameraRaycaster;
        this.#mouse = mouse;
    }

    getIntersect() {
        return this.#cameraRaycaster.getIntersect();
    }

    getSelectedCoord() {
        const selectedIntersect = this.getIntersect();
        if (!selectedIntersect) return null;
        const selectedCoord = new Vector3();
        const normal = selectedIntersect.face.normal
            .clone()
            .multiplyScalar(0.1);

        selectedCoord
            .copy(selectedIntersect.point)
            .add(normal)
            .multiplyScalar(1.001)
            .floor();
        return selectedCoord;
    }
}

const createMouseCoordSelector = (cameraRaycaster, mouse, keyboard) => {
    const mouseCoordSelector = new MouseCoordSelector(cameraRaycaster);

    document.addEventListener(MOUSE_MOVED, () => {
        const selectedCoord = mouseCoordSelector.getSelectedCoord();
        if (selectedCoord != null)
            document.dispatchEvent(new Event(COORD_HOVERED));
    });

    document.addEventListener(MOUSE_UP, () => {
        if (!mouse.isDragging) {
            const selectedCoord = mouseCoordSelector.getSelectedCoord();
            if (selectedCoord != null) {
                if (keyboard.isShiftDown) {
                    document.dispatchEvent(new Event(COORD_SHIFT_CLICKED));
                } else {
                    document.dispatchEvent(new Event(COORD_CLICKED));
                    // voxelAdder.addVoxel(selectedCoord, voxelGroup);
                }
            }
        }
    });

    return mouseCoordSelector;
};

export { createMouseCoordSelector };
