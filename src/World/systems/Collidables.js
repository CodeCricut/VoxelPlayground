class Collidables {
    constructor(initialCollidables = []) {
        this.collidables = [...initialCollidables];
    }

    addCollidables(...collidables) {
        this.collidables.push(...collidables);
    }

    removeCollidables(...collidables) {
        console.error('removeCollidables not implemented');
        // this.collidables.remove(...collidables);
    }
}

export { Collidables };
