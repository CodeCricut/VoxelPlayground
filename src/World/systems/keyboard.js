const keyboard = {
    isShiftDown: false,
};

const onDocumentKeyDown = (event) => {
    switch (event.keyCode) {
        case 16:
            keyboard.isShiftDown = true;
            break;
    }
};

const onDocumentKeyUp = (event) => {
    switch (event.keyCode) {
        case 16:
            keyboard.isShiftDown = false;
            break;
    }
};

document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

export { keyboard };
