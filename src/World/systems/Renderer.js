import { WebGLRenderer } from 'three';
import { WEBGL } from './webgl';

class Renderer extends WebGLRenderer {
    constructor(container, parameters) {
        super(parameters);
        this.container = container;
    }

    get canRender() {
        return WEBGL.isWebGLAvailable();
    }

    get renderErrorMessage() {
        return WEBGL.getWebGLErrorMessage();
    }

    render() {
        console.log('custom render');
        if (this.canRender) {
            super.render();
        } else {
            this.container.appendChild(this.renderErrorMessage);
        }
    }
}

const createRenderer = (container) => {
    const renderer = new Renderer(container, { antialias: true });
    renderer.physicallyCorrectLights = true;

    if (renderer.canRender) container.append(renderer.domElement);

    return renderer;
};

export { createRenderer };
