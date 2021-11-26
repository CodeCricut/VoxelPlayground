import { AmbientLight } from 'three';

const createAmbientLight = () => {
    return new AmbientLight(0x606060, 8);
};

export { createAmbientLight };
