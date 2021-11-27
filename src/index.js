import { World } from './World/World';
import '../static/styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { WEBGL } from './World/systems/webgl';

const main = () => {
    const container = document.querySelector('#scene-container');

    if (WEBGL.isWebGLAvailable()) {
        const world = new World(container);
        world.start();
    } else {
        container.appendChild(WEBGL.getErrorMessage());
    }
};

main();
