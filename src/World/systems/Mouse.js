import { Vector2 } from 'three';

const MOUSE_MOVED = 'MOUSE_MOVED',
    MOUSE_DOWN = 'MOUSE_DOWN',
    MOUSE_UP = 'MOUSE_UP';

class Mouse {
    constructor() {
        this.position = new Vector2();
        this.isDragging = false;
        this.isDown = false;

        document.addEventListener(
            'mousemove',
            this.#onDocumentMouseMove,
            false,
        );
        document.addEventListener(
            'mousedown',
            this.#onDocumentMouseDown,
            false,
        );
        document.addEventListener('mouseup', this.#onDocumentMouseUp, false);
    }

    #onDocumentMouseMove(event) {
        event.preventDefault();
        if (this.isDown) {
            this.isDragging = true;
        }
        this.#setPosFromMouseEvent(event);

        this.dispatchEvent(new Event(MOUSE_MOVED));
    }

    #onDocumentMouseDown(event) {
        event.preventDefault();

        this.isDown = true;

        this.#setPosFromMouseEvent(event);

        this.dispatchEvent(new Event(MOUSE_DOWN));
    }

    #onDocumentMouseUp(event) {
        event.preventDefault();
        this.isDown = false;
        this.dispatchEvent(new Event(MOUSE_UP));
        this.isDragging = false;
    }

    #setPosFromMouseEvent(event) {
        const element = event.target;
        if (element instanceof HTMLCanvasElement) {
            const rect = event.target.getBoundingClientRect();
            // Calculate mouse position, normalized between -1 to +1 for both x and y
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            this.position.set(x, y);
        }
    }
}

export { Mouse, MOUSE_UP, MOUSE_DOWN, MOUSE_MOVED };
