import { WEBGL } from './webgl';
import { init, render } from './voxels';

if (WEBGL.isWebGLAvailable()) {
  init();
  render();
} else {
  let warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
