import TexturedCube, { CUBE_DIMS } from './TexturedCube';

const snapToIntersect = (obj3d, intersect) => {
  obj3d.position
    .copy(intersect.point)
    // Ensure that it is positioned towards the camera, not on the opposite face
    .add(intersect.face.normal);
  const gridPos = getSnappedGridPos(obj3d.position);
  obj3d.position.copy(gridPos);
};

const getSnappedGridPos = (point) => {
  return point
    .divideScalar(CUBE_DIMS)
    .floor()
    .multiplyScalar(CUBE_DIMS)
    .addScalar(CUBE_DIMS / 2);
};

export { snapToIntersect, getSnappedGridPos };
