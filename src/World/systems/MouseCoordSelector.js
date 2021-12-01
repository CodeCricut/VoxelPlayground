import { MOUSE_MOVED, MOUSE_UP, MOUSE_DOWN } from './Mouse';
import { EventDispatcher, Vector3 } from 'three';

export const COORD_HOVERED = 'COORD_HOVERED',
    COORD_CLICKED = 'COORD_CLICKED',
    COORD_SHIFT_CLICKED = 'COORD_SHIFT_CLICKED';

class MouseCoordSelector extends EventDispatcher {
    #cameraRaycaster;
    constructor(cameraRaycaster, mouse, keyboard) {
        super();
        this.#cameraRaycaster = cameraRaycaster;

        mouse.addEventListener(MOUSE_MOVED, () => {
            if (this.getSelectedCoord() != null) {
                this.dispatchEvent({ type: COORD_HOVERED });
            }
        });

        mouse.addEventListener(MOUSE_UP, () => {
            if (!mouse.isDragging) {
                if (this.getSelectedCoord() != null) {
                    if (keyboard.isShiftDown)
                        this.dispatchEvent({ type: COORD_SHIFT_CLICKED });
                    else this.dispatchEvent({ type: COORD_CLICKED });
                }
            }
        });
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

export { MouseCoordSelector };
