import { HemisphereLight } from 'three';

const createHemisphereLight = () => {
    const light = new HemisphereLight('white', 'darkslategrey', 5);
    return light;
};

export { createHemisphereLight };
