import { AmbientLight } from 'three';

const createAmbientLight = () => {
    return new AmbientLight('white', 3);
};

export { createAmbientLight };
