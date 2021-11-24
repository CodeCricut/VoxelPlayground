import * as THREE from 'three';
import { DIRT, STONE, GRASS } from './Voxel';

const dirtBtn = document.getElementById('dirt-btn');
const stoneBtn = document.getElementById('stone-btn');
const grassBtn = document.getElementById('grass-btn');

let selectedMaterialType = DIRT;

const selectMaterialType = (material) => {
  selectedMaterialType = material;
};

dirtBtn.addEventListener('click', () => selectMaterialType(DIRT));
stoneBtn.addEventListener('click', () => selectMaterialType(STONE));
grassBtn.addEventListener('click', () => selectMaterialType(GRASS));

export { selectMaterialType, selectedMaterialType };
