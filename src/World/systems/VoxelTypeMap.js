class VoxelTypeMap {
    #voxels;
    constructor(initialObjects = new Map()) {
        this.#voxels = initialObjects;
    }

    setVoxelType(location, voxelType) {
        this.#voxels.set([location], voxelType);
    }

    getVoxelTypeAtPosition(position) {
        return this.#voxels.get(position);
    }

    getVoxelTypes() {
        const voxelTypes = [...this.#voxels].map(([location, obj]) => obj);
        return voxelTypes;
    }

    getMap() {
        return new Map(this.#voxels);
    }

    resetAtPosition(position) {
        this.#voxels.delete(position);
    }
}
