import * as THREE from 'three';
import { Vector3 } from 'three';
import { CUBE_DIMS } from './Voxel';

export const PIG = 'PIG';

class Pig extends THREE.Mesh {
    constructor(position = new THREE.Vector3()) {
        const geometry = new THREE.BoxGeometry(CUBE_DIMS, CUBE_DIMS, CUBE_DIMS);
        const material = new THREE.MeshLambertMaterial({
            color: 0xf099de,
        });
        super(geometry, material);

        this.position.copy(position);
        this.lastUpdated = Date.now();
    }

    tick() {
        const currTime = Date.now();
        if ((currTime - this.lastUpdated) / 1000 > 3) {
            this.lastUpdated = currTime;

            const rand = Math.floor(Math.random() * 5);
            switch (rand) {
                case 0:
                    this.moveForward();
                    break;
                case 1:
                    this.moveBackward();
                    break;
                case 2:
                    this.moveRight();
                    break;
                case 3:
                    this.moveLeft();
                    break;
                case 4:
                    this.remainStationary();
                default:
                    break;
            }
        }
    }

    moveForward() {
        this.position.add(new Vector3(CUBE_DIMS, 0, 0));
    }

    moveBackward() {
        this.position.add(new Vector3(-CUBE_DIMS, 0, 0));
    }

    moveRight() {
        this.position.add(new Vector3(0, 0, CUBE_DIMS));
    }

    moveLeft() {
        this.position.add(new Vector3(0, 0, -CUBE_DIMS));
    }

    remainStationary() {}
}

export default Pig;
