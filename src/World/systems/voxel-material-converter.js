import { TextureLoader, MeshStandardMaterial, Color } from 'three';
import squarePic from '../../../static/textures/square.png';

import { DIRT, STONE, GRASS } from '../utility/voxel-types';

const textureLoader = new TextureLoader();
const squareTextureMap = textureLoader.load(squarePic);

const typeToMaterial = (type) => {
    const material = new MeshStandardMaterial({
        color: 0x050505,
        map: squareTextureMap,
    });

    switch (type) {
        case DIRT:
            material.color = new Color(0x9c620b);
            break;
        case STONE:
            material.color = new Color(0xc7bbc0);
            break;
        case GRASS:
            material.color = new Color(0x239e43);
            break;
    }

    return material;
};

const createVoxelMaterialConverter = (renderer) => {
    squareTextureMap.anisotropy = renderer.getMaxAnisotropy();

    const converter = {
        typeToMaterial,
    };

    return converter;
};

export { createVoxelMaterialConverter };
