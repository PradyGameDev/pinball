var width, height;
var camera, scene, renderer;

var jsonLoader;

var ball, cube, ground;
var orbitControls;

var flipperLeft, flipperRight;

var keyboard;

init();
function init() {
  initWindow();
  loader = new THREE.JSONLoader();
  initScene();

  loop();
}

function initWindow() {
  width = window.innerWidth;
  height = window.innerHeight;

  window.addEventListener('resize', function() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, false);
}

function initScene() {
  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 200, 150);
  camera.rotation.x = -Math.PI / 3;

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // DEBUG Orbit Controls
  // orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  // orbitControls.addEventListener('change', renderer);
  // orbitControls.enableZoom = false;

  // Lighting
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.castShadow = true;
  pointLight.position.set(0, 50, 0);
  scene.add(pointLight);

  machine = new Machine();

  keyboard = new THREEx.KeyboardState();

  flipperLeft = new Flipper(true);
  scene.add(flipperLeft.mesh);

  flipperRight = new Flipper(false);
  scene.add(flipperRight.mesh);

  // Cube
  loader.load('cube.json', function(geometry) {
    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(10, 10, 10);
    mesh.position.set(-20, 5, 20);
    scene.add(mesh);
  });
}

function loop() {
    control();
    update();
    render();
    requestAnimationFrame(loop);
}

function update() {
    machine.update();
    flipperLeft.update();
    flipperRight.update();
}

function render() {
  renderer.render(scene, camera);
}

function control() {
    if (keyboard.pressed("left")) {
        flipperLeft.flip();
    }

    if (keyboard.pressed("right")) {
        flipperRight.flip();
    }
}

