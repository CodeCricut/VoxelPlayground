import { Vector2 } from 'three';

export const MOUSE_MOVED = 'MOUSE_MOVED',
  MOUSE_DOWN = 'MOUSE_DOWN';

const mouse = new Vector2();

const onDocumentMouseMove = (event) => {
  event.preventDefault();

  setPosFromMouseEvent(event);

  document.dispatchEvent(new Event(MOUSE_MOVED));
};

const onDocumentMouseDown = (event) => {
  event.preventDefault();

  setPosFromMouseEvent(event);

  document.dispatchEvent(new Event(MOUSE_DOWN));
};

export const setPosFromMouseEvent = (event) => {
  mouse.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
  );
};

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);

export default mouse;
