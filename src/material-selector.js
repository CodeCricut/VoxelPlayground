import * as THREE from 'three';
import { DIRT, STONE, GRASS } from './Voxel';
import { PIG } from './Pig';

const dirtBtn = document.getElementById('dirt-btn');
const stoneBtn = document.getElementById('stone-btn');
const grassBtn = document.getElementById('grass-btn');
const pigBtn = document.getElementById('pig-btn');

let selectedMaterialType = DIRT;

const selectMaterialType = (material) => {
    selectedMaterialType = material;
};

const selectDirt = () => {
    deselectAllBtns();
    selectBtn(dirtBtn);
    selectMaterialType(DIRT);
};

const selectStone = () => {
    deselectAllBtns();
    selectBtn(stoneBtn);
    selectMaterialType(STONE);
};

const selectGrass = () => {
    deselectAllBtns();
    selectBtn(grassBtn);
    selectMaterialType(GRASS);
};

const selectPig = () => {
    deselectAllBtns();
    selectBtn(pigBtn);
    selectMaterialType(PIG);
};

const selectBtn = (btn) => {
    btn.classList.add('btn-selected');
};

const deselectAllBtns = () => {
    deselectBtn(dirtBtn);
    deselectBtn(stoneBtn);
    deselectBtn(grassBtn);
    deselectBtn(pigBtn);
};

const deselectBtn = (btn) => {
    btn.classList.remove('btn-selected');
};

dirtBtn.addEventListener('click', selectDirt);
stoneBtn.addEventListener('click', selectStone);
grassBtn.addEventListener('click', selectGrass);
pigBtn.addEventListener('click', selectPig);

selectDirt();

export { selectMaterialType, selectedMaterialType };
