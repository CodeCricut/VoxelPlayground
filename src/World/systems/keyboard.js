import { EventDispatcher } from 'three';

export const SHIFT_DOWN = 'SHIFT_DOWN',
    SHIFT_UP = 'SHIFT_UP';

const onDocumentKeyDown = (event, keyboard) => {
    switch (event.keyCode) {
        case 16:
            keyboard.isShiftDown = true;
            keyboard.dispatchEvent({ type: SHIFT_DOWN });
            break;
    }
};

const onDocumentKeyUp = (event, keyboard) => {
    switch (event.keyCode) {
        case 16:
            keyboard.isShiftDown = false;
            keyboard.dispatchEvent({ type: SHIFT_UP });
            break;
    }
};

class Keyboard extends EventDispatcher {
    constructor() {
        super();
        this.isShiftDown = false;

        document.addEventListener(
            'keydown',
            (event) => onDocumentKeyDown(event, this),
            false,
        );
        document.addEventListener(
            'keyup',
            (event) => onDocumentKeyUp(event, this),
            false,
        );
    }
}
export { Keyboard };
