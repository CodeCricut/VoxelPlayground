import { HemisphereLight } from 'three';

const createHemisphereLight = () => {
    const light = new HemisphereLight('lightblue', 'darkslategrey', 6);
    return light;
};

export { createHemisphereLight };
