import {
    TextureLoader,
    MeshStandardMaterial,
    Color,
    Vector2,
    MeshBasicMaterial,
    Combine,
    MixOperation,
} from 'three';
import dirtTexture from '../../../static/textures/dirt.png';

import testTexture from '../../../static/textures/test-texture.png';
import stoneTexture from '../../../static/textures/stone.png';
import grassTexture from '../../../static/textures/grass.png';
import grassNormal from '../../../static/textures/grass-normal.jpg';
import skyTexture from '../../../static/textures/sky-dome.jpg';

import { DIRT, STONE, GRASS } from '../utility/voxel-types';

const textureLoader = new TextureLoader();
const testTextureMap = textureLoader.load(testTexture);
const dirtTextureMap = textureLoader.load(dirtTexture);
const stoneTextureMap = textureLoader.load(stoneTexture);

const grassTextureMap = textureLoader.load(grassTexture);
const grassNormalMap = textureLoader.load(grassNormal);

const skyTextureMap = textureLoader.load(skyTexture);

const typeToMaterial = (type) => {
    const material = new MeshStandardMaterial({
        normalMap: grassNormalMap,
        normalScale: new Vector2(0.1, 0.1),
        map: testTextureMap,
        color: 0x15450c,
    });

    switch (type) {
        case DIRT:
            material.color = new Color(0x663516);
            material.map = dirtTextureMap;
            break;
        case STONE:
            material.color = new Color(0x4a4746);
            material.map = stoneTextureMap;
            break;
        case GRASS:
            material.color = new Color(0x15450c);
            material.map = grassTextureMap;
            break;
    }

    return material;
};

const createVoxelMaterialConverter = (renderer) => {
    const converter = {
        typeToMaterial,
    };

    return converter;
};

export { createVoxelMaterialConverter };
