import { WebGLRenderer } from 'three';

const createRenderer = () => {
    const renderer = new WebGLRenderer({ antialias: true });

    // Turn on accurate lighting, based on real-world physics equations
    // Default is false for backwards-compatibility
    // Note that this does not enable shadows. That should be done on a light-by-light or object-by-object basis
    renderer.physicallyCorrectLights = true;

    return renderer;
};

export { createRenderer };
