import {
    BackSide,
    Mesh,
    MeshPhongMaterial,
    SphereGeometry,
    TextureLoader,
} from 'three';
import skyTexture from '../../../static/textures/sky-dome.jpg';

const loader = new TextureLoader();
const skyTextureMap = loader.load(skyTexture);

const material = new MeshPhongMaterial({
    map: skyTextureMap,
});

const skyGeo = new SphereGeometry(100000, 25, 25);

const createSkyDome = () => {
    const sky = new Mesh(skyGeo, material);
    sky.material.side = BackSide;
    return sky;
};

export { createSkyDome };
