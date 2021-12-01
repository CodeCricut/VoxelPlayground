import { EventDispatcher } from 'three';
import { DIRT, STONE, GRASS } from '../utility/voxel-types';
import { typeToMaterial } from './voxel-material-converter';

export const MATERIAL_TYPE_SELECTED = 'MATERIAL_TYPE_SELECTED';

const dirtBtn = document.getElementById('dirt-btn');
const stoneBtn = document.getElementById('stone-btn');
const grassBtn = document.getElementById('grass-btn');

const selectBtn = (btn) => {
    btn.classList.add('btn-selected');
};

const deselectAllBtns = () => {
    deselectBtn(dirtBtn);
    deselectBtn(stoneBtn);
    deselectBtn(grassBtn);
};

const deselectBtn = (btn) => {
    btn.classList.remove('btn-selected');
};

class MaterialSelector extends EventDispatcher {
    selectedType;
    constructor() {
        super();
        dirtBtn.addEventListener('click', () => this.selectDirt());
        stoneBtn.addEventListener('click', () => this.selectStone());
        grassBtn.addEventListener('click', () => this.selectGrass());

        this.selectDirt();
    }

    get selectedMaterial() {
        return typeToMaterial(this.selectedType);
    }

    selectMaterialType(type) {
        this.selectedType = type;
        this.dispatchEvent({ type: MATERIAL_TYPE_SELECTED });
    }

    selectStone() {
        deselectAllBtns();
        selectBtn(stoneBtn);
        this.selectMaterialType(STONE);
    }

    selectGrass() {
        deselectAllBtns();
        selectBtn(grassBtn);
        this.selectMaterialType(GRASS);
    }

    selectDirt() {
        deselectAllBtns();
        selectBtn(dirtBtn);
        this.selectMaterialType(DIRT);
    }
}

export { MaterialSelector };
