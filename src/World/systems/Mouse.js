import { Vector2 } from 'three';

const MOUSE_MOVED = 'MOUSE_MOVED',
    MOUSE_DOWN = 'MOUSE_DOWN',
    MOUSE_UP = 'MOUSE_UP';

function onDocumentMouseMove(event, mouse) {
    event.preventDefault();
    if (mouse.isDown) {
        mouse.isDragging = true;
    }
    setPosFromMouseEvent(event, mouse);
    document.dispatchEvent(new Event(MOUSE_MOVED));
}

function onDocumentMouseDown(event, mouse) {
    event.preventDefault();

    mouse.isDown = true;

    setPosFromMouseEvent(event, mouse);

    document.dispatchEvent(new Event(MOUSE_DOWN));
}

function onDocumentMouseUp(event, mouse) {
    event.preventDefault();

    mouse.isDown = false;

    document.dispatchEvent(new Event(MOUSE_UP));

    mouse.isDragging = false;
}

function setPosFromMouseEvent(event, mouse) {
    const element = event.target;
    if (element instanceof HTMLCanvasElement) {
        const rect = event.target.getBoundingClientRect();
        // Calculate mouse position, normalized between -1 to +1 for both x and y
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        mouse.position.set(x, y);
    }
}

const createMouse = (canvas) => {
    const mouse = { isDragging: false, isDown: false, position: new Vector2() };
    canvas.addEventListener('mousemove', (event) =>
        onDocumentMouseMove(event, mouse),
    );
    canvas.addEventListener(
        'mousedown',
        (event) => onDocumentMouseDown(event, mouse),
        false,
    );
    canvas.addEventListener(
        'mouseup',
        (event) => onDocumentMouseUp(event, mouse),
        false,
    );

    return mouse;
};
export { createMouse, MOUSE_UP, MOUSE_DOWN, MOUSE_MOVED };
