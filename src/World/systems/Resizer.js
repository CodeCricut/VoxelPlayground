import { EventDispatcher } from 'three';

export const RESIZED = 'RESIZED';

const setSize = (container, camera, renderer) => {
    // Update aspect ratio and frustrum
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    // Update renderer AND canvas size
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Update the pixel ratio to match device (can change when flipping mobile device)
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer extends EventDispatcher {
    constructor(container, camera, renderer) {
        super();
        setSize(container, camera, renderer);

        window.addEventListener('resize', () => {
            setSize(container, camera, renderer);
            this.dispatchEvent({ type: RESIZED });
        });
    }
}

export { Resizer };
