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
  mouse.position.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
  );
};

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
export default mouse;
