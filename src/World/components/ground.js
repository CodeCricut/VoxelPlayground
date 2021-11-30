import {
    BoxBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    RepeatWrapping,
    TextureLoader,
    Vector2,
} from 'three';

import grassTexture from '../../../static/textures/grass.png';
import grassNormal from '../../../static/textures/grass-normal.jpg';

const GROUND_DIM = 1000;

const textureLoader = new TextureLoader();
const grassTextureMap = textureLoader.load(grassTexture);
grassTextureMap.repeat = new Vector2(GROUND_DIM, GROUND_DIM);
grassTextureMap.wrapS = RepeatWrapping;
grassTextureMap.wrapT = RepeatWrapping;

const grassNormalMap = textureLoader.load(grassNormal);
grassNormalMap.repeat = new Vector2(GROUND_DIM, GROUND_DIM);
grassNormalMap.wrapS = RepeatWrapping;
grassNormalMap.wrapT = RepeatWrapping;

const createMaterial = () => {
    const material = new MeshStandardMaterial({
        map: grassTextureMap,
        color: 0x15450c,
        normalMap: grassNormalMap,
        normalScale: new Vector2(0.1, 0.1),
    });
    return material;
};

const createGround = () => {
    const geometry = new BoxBufferGeometry(GROUND_DIM, 1, GROUND_DIM);
    const material = createMaterial();
    const ground = new Mesh(geometry, material);

    return ground;
};

export { createGround };
