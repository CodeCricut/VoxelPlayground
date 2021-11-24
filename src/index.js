import * as THREE from 'three';
import { WEBGL } from './webgl';
import './modal';

if (WEBGL.isWebGLAvailable()) {
  let camera, scene, renderer;
  let hitboxPlane;
  let mouse,
    raycaster,
    isShiftDown = false;

  let rollOverMesh, rollOverMaterial;
  let cubeGeo, cubeMaterial;

  let objects = [];

  init();
  render();

  function init() {
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    let rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    // Add the rollover mesh at the origin
    scene.add(rollOverMesh);

    cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xfeb74c,
      map: new THREE.TextureLoader().load('static/textures/square.png'),
    });

    let gridHelper = new THREE.GridHelper(1000, 20);
    scene.add(gridHelper);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    let hitboxGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
    hitboxGeometry.rotateX(-Math.PI / 2);

    hitboxPlane = new THREE.Mesh(
      hitboxGeometry,
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    scene.add(hitboxPlane);

    objects.push(hitboxPlane);

    let ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);
    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      let intersect = intersects[0];

      // Move the rollover mesh to where the position the mouse is pointing
      rollOverMesh.position
        .copy(intersect.point)
        // Ensure that it is positioned towards the camera, not on the opposite face
        .add(intersect.face.normal);

      // position on grid
      rollOverMesh.position
        // Round to nearest 50 units
        .divideScalar(50)
        .floor()
        .multiplyScalar(50)
        // Position away from vertices, in the cube
        .addScalar(25);
    }

    render();
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();

    // Update mouse pos
    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );

    // Get position of clicked obj
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      let intersect = intersects[0];

      // Remove obj if holding shift
      if (isShiftDown) {
        if (intersect.object !== hitboxPlane) {
          scene.remove(intersect.object);

          objects.splice(objects.indexOf(intersect.object), 1);
        }
      } else {
        // create new voxel
        let voxel = new THREE.Mesh(cubeGeo, cubeMaterial);

        // position on grid
        voxel.position.copy(intersect.point).add(intersect.face.normal);
        voxel.position
          .divideScalar(50)
          .floor()
          .multiplyScalar(50)
          .addScalar(25);

        scene.add(voxel);

        objects.push(voxel);
      }

      render();
    }
  }

  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        isShiftDown = true;
        break;
    }
  }

  function onDocumentKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        isShiftDown = false;
        break;
    }
  }

  function render() {
    renderer.render(scene, camera);
  }
} else {
  let warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
