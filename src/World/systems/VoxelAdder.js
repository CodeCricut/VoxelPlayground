import { EventDispatcher, Vector3 } from 'three';
import { Voxel } from '../components/Voxel';
/*
In order to add a voxel,
1. need to have type (MaterialSelector.selectedType)
2. need to convert type to material (MaterialSelector.material, uses VoxelMaterialConverter interally)
3. need to instantiate voxel at coord (VoxelFactory)
4. need to add to voxel group 
5. need to raise VOXEL_ADDED event
*/
export const VOXEL_ADDED = 'VOXEL_ADDED';

class VoxelAdder extends EventDispatcher {
    #voxelGroup;
    #materialSelector;
    constructor(voxelGroup, materialSelector) {
        super();
        this.#voxelGroup = voxelGroup;
        this.#materialSelector = materialSelector;
    }

    addVoxel(position = new Vector3()) {
        const voxel = new Voxel(
            position,
            this.#materialSelector.selectedMaterial,
        );
        this.#voxelGroup.add(voxel);
        this.dispatchEvent({
            type: VOXEL_ADDED,
            voxelType: this.#materialSelector.selectedType,
        });
    }
}

export { VoxelAdder };
