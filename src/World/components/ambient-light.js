import { AmbientLight } from 'three';

const createAmbientLight = () => {
    return new AmbientLight('white', 5);
};

export { createAmbientLight };
