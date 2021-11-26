import { World } from './World/World';
import '../static/styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const main = () => {
    const container = document.querySelector('#scene-container');
    console.dir(container);

    const world = new World(container);

    world.start();
};

main();
