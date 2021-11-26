import { WEBGL } from './webgl';
import { init, render } from './voxels';
import '../static/styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

if (WEBGL.isWebGLAvailable()) {
    init();
    render();
} else {
    let warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}
