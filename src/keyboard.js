export const keyboard = {
  isShiftDown: false,
};

export const onDocumentKeyDown = (event) => {
  switch (event.keyCode) {
    case 16:
      keyboard.isShiftDown = true;
      break;
  }
};

export const onDocumentKeyUp = (event) => {
  switch (event.keyCode) {
    case 16:
      keyboard.isShiftDown = false;
      break;
  }
};
