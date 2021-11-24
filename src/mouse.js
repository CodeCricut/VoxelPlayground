import { Vector2 } from 'three';

export const MOUSE_MOVED = 'MOUSE_MOVED',
  MOUSE_DOWN = 'MOUSE_DOWN',
  MOUSE_UP = 'MOUSE_UP';

const mouse = {
  position: new Vector2(),
  isDragging: false,
  isDown: false,
};

const onDocumentMouseMove = (event) => {
  event.preventDefault();
  if (mouse.isDown) {
    mouse.isDragging = true;
  }
  setPosFromMouseEvent(event);

  document.dispatchEvent(new Event(MOUSE_MOVED));
};

const onDocumentMouseDown = (event) => {
  event.preventDefault();

  mouse.isDown = true;

  setPosFromMouseEvent(event);

  document.dispatchEvent(new Event(MOUSE_DOWN));
};

const onDocumentMouseUp = (event) => {
  mouse.isDown = false;
  document.dispatchEvent(new Event(MOUSE_UP));
  mouse.isDragging = false;
};

export const setPosFromMouseEvent = (event) => {
  const element = event.target;
  if (element instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();
    // Calculate mouse position, normalized between -1 to +1 for both x and y
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    mouse.position.set(x, y);
  }
};

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
export default mouse;
