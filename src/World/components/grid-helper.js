import { GridHelper } from 'three';

const createGridHelper = (cellSize, divisions) => {
    const gridHelper = new GridHelper(cellSize * divisions, divisions);
    return gridHelper;
};

export { createGridHelper };
