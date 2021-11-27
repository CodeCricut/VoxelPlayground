import { MOUSE_MOVED, MOUSE_UP, MOUSE_DOWN } from './Mouse';
import { Object3D, RedIntegerFormat, Vector3 } from 'three';

const COORD_SELECTED = 'VOXEL_SELECTED';

class MouseCoordSelector {
    #cameraRaycaster;
    constructor(cameraRaycaster) {
        this.#cameraRaycaster = cameraRaycaster;
    }

    getIntersect() {
        return this.#cameraRaycaster.getIntersect();
    }

    getSelectedCoord() {
        const selectedIntersect = this.getIntersect();
        if (!selectedIntersect) return null;
        const selectedCoord = new Vector3();
        selectedCoord
            .copy(selectedIntersect.point)
            .add(selectedIntersect.face.normal)
            .multiplyScalar(0.99999)
            .floor();
        return selectedCoord;
    }
}

const createMouseCoordSelector = (cameraRaycaster) => {
    const mouseCoordSelector = new MouseCoordSelector(cameraRaycaster);
    document.addEventListener(MOUSE_MOVED, () => {
        const selectedCoord = mouseCoordSelector.getSelectedCoord();
        if (selectedCoord != null)
            document.dispatchEvent(new Event(COORD_SELECTED));
    });
    return mouseCoordSelector;
};

export { createMouseCoordSelector, COORD_SELECTED };
