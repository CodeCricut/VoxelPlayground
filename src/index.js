import { WEBGL } from './webgl';
import { init, render } from './voxels';
import 'bootstrap';

if (WEBGL.isWebGLAvailable()) {
    init();
    render();
} else {
    let warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}
