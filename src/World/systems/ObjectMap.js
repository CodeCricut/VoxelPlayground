const positionToKey = (position) => {
    return '(' + position.x + ',' + position.y + ',' + position.z + ')';
};

class ObjectMap {
    #objects;
    constructor(initialObjects = new Map()) {
        this.#objects = initialObjects;
    }

    addObject(object) {
        const key = positionToKey(object.position);
        this.#objects.set(key, object);
    }

    getObjectAtPosition(position) {
        const key = positionToKey(position);
        // Messy, but it seems you can't override Map equality in JS
        for (const [k, v] of this.#objects) {
            if (k === key) return v;
        }
        return null;
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
