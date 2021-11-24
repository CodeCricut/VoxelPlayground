import * as THREE from 'three';
import { DIRT, STONE } from './Voxel';

const dirtBtn = document.getElementById('dirt-btn');
const stoneBtn = document.getElementById('stone-btn');

let selectedMaterialType = DIRT;

const selectMaterialType = (material) => {
  selectedMaterialType = material;
};

dirtBtn.addEventListener('click', () => selectMaterialType(DIRT));
stoneBtn.addEventListener('click', () => selectMaterialType(STONE));

export { selectMaterialType, selectedMaterialType };
