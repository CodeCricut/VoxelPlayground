import { Object3D, Vector3 } from 'three';

// The amount voxels must be translated along each axis to lign
// edges up with coord lines instead of centers along coord lines
const COORD_TRANSFORM = 0.5;

const COORD_TRANSFORM_VECTOR = new Vector3(
    COORD_TRANSFORM,
    COORD_TRANSFORM,
    COORD_TRANSFORM,
);

const createCoordinateBasis = () => {
    const coordBasis = new Object3D();
    coordBasis.position.add(COORD_TRANSFORM_VECTOR);
    return coordBasis;
};

export { createCoordinateBasis, COORD_TRANSFORM, COORD_TRANSFORM_VECTOR };
