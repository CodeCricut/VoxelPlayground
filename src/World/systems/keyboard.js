const onDocumentKeyDown = (event, keyboard) => {
    switch (event.keyCode) {
        case 16:
            keyboard.isShiftDown = true;
            break;
    }
};

const onDocumentKeyUp = (event, keyboard) => {
    switch (event.keyCode) {
        case 16:
            keyboard.isShiftDown = false;
            break;
    }
};

const createKeyboard = () => {
    const keyboard = {
        isShiftDown: false,
    };

    document.addEventListener(
        'keydown',
        (event) => onDocumentKeyDown(event, keyboard),
        false,
    );
    document.addEventListener(
        'keyup',
        (event) => onDocumentKeyUp(event, keyboard),
        false,
    );

    return keyboard;
};
export { createKeyboard };
