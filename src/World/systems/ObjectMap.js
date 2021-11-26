class ObjectMap {
    #objects;
    constructor(initialObjects = {}) {
        this.#objects = initialObjects;
    }

    addObject(object) {
        this.#objects[object.position] = object;
    }

    getObjectAtPosition(position) {
        return this.#objects[position];
    }

    getObjects() {
        return { ...this.#objects };
    }

    removeObject(object) {
        delete this.#objects[object.position];
    }

    removeObjectAtPosition(position) {
        delete this.#objects[position];
    }
}

export { ObjectMap };
