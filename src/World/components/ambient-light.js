import { AmbientLight } from 'three';

const createAmbientLight = () => {
    return new AmbientLight('white', 4);
};

export { createAmbientLight };
