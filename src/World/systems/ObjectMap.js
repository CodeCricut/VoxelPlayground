class ObjectMap {
    #objects;
    constructor(initialObjects = new Map()) {
        this.#objects = initialObjects;
    }

    addObject(object) {
        this.#objects.set([object.position], object);
    }

    getObjectAtPosition(position) {
        return this.#objects.get(position);
    }

    getObjects() {
        const objArr = [...this.#objects].map(([location, obj]) => obj);
        return objArr;
    }

    removeObject(object) {
        this.removeObjectAtPosition(object.position);
    }

    removeObjectAtPosition(position) {
        this.#objects.delete(position);
    }
}

export { ObjectMap };
