import { PlaneBufferGeometry, Mesh, MeshBasicMaterial } from 'three';

const createHitboxPlane = () => {
    const hitboxGeometry = new PlaneBufferGeometry(1000, 1000);
    hitboxGeometry.rotateX(-Math.PI / 2);
    return new Mesh(hitboxGeometry, new MeshBasicMaterial({ visible: false }));
};

export { createHitboxPlane };
