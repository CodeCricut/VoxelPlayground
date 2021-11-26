const setSize = (container, camera, renderer) => {
    // Update aspect ratio and frustrum
    camera.aspect = container.innerWidth / container.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer AND canvas size
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Update the pixel ratio to match device (can change when flipping mobile device)
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
    constructor(container, camera, renderer) {
        setSize(container, camera, renderer);

        window.addEventListener('resize', () => {
            setSize(container, camera, renderer);
            this.onResize();
        });
    }

    // We can 'hook' into onResize outside of the class
    // If you aren't rendering every frame, you should hook into this to render when this is called
    onResize() {}
}

export { Resizer };
