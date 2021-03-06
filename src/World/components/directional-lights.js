import {
    DirectionalLight, // Sunlight
    PointLight, // Direct indoor lighting
    SpotLight, // Spot light
    RectAreaLight, // Strip lights
} from 'three';

const createDirectionalLights = () => {
    const light = new DirectionalLight('white', 5);

    // DirectionalLight shines from light.position to light.target.position
    light.position.set(10, 10, 10);
    return light;
};

export { createDirectionalLights };
