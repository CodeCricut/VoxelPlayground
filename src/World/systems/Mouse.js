import { EventDispatcher, Vector2 } from 'three';

const MOUSE_MOVED = 'MOUSE_MOVED',
    MOUSE_DOWN = 'MOUSE_DOWN',
    MOUSE_UP = 'MOUSE_UP';

function onDocumentMouseMove(event, mouse) {
    if (mouse.isDown) {
        mouse.isDragging = true;
    }
    setPosFromMouseEvent(event, mouse);
    mouse.dispatchEvent({ type: MOUSE_MOVED });
}

function onDocumentMouseDown(event, mouse) {
    mouse.isDown = true;
    setPosFromMouseEvent(event, mouse);
    mouse.dispatchEvent({ type: MOUSE_DOWN });
}

function onDocumentMouseUp(event, mouse) {
    mouse.isDown = false;
    setPosFromMouseEvent(event, mouse);
    mouse.dispatchEvent({ type: MOUSE_UP });
    mouse.isDragging = false;
}

function setPosFromMouseEvent(event, mouse) {
    const element = event.target;
    if (element instanceof HTMLCanvasElement) {
        event.preventDefault();

        const rect = event.target.getBoundingClientRect();

        mouse.positionScreen.set(event.clientX, event.clientY);
        mouse.positionCanvas.set(
            event.clientX - rect.left,
            event.clientY - rect.top,
        );

        // Calculate mouse position, normalized between -1 to +1 for both x and y
        const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const normalizedY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        mouse.positionNormalized.set(normalizedX, normalizedY);
    }
}

class Mouse extends EventDispatcher {
    isDown;
    isDragging;
    positionScreen;
    positionCanvas;
    positionNormalized;

    constructor() {
        super();
        this.isDown = false;
        this.isDragging = false;
        this.positionScreen = new Vector2();
        this.positionNormalized = new Vector2();
        this.positionCanvas = new Vector2();

        document.addEventListener('mousemove', (event) =>
            onDocumentMouseMove(event, this),
        );
        document.addEventListener(
            'mousedown',
            (event) => onDocumentMouseDown(event, this),
            false,
        );
        document.addEventListener(
            'mouseup',
            (event) => onDocumentMouseUp(event, this),
            false,
        );
    }
}

export { Mouse, MOUSE_UP, MOUSE_DOWN, MOUSE_MOVED };
