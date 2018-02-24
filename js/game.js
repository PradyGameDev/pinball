var width, height;

var camera, scene, renderer;
var orbitControls;

var ball, machine;

// Components
var jsonLoader;
var gutter;

var flipperLeft, flipperRight;

var keyboard;

init();
function init() {
  initWindow();
  initScene();
  loadComponents();

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
  camera.position.set(0, 3, 0);
  camera.rotation.x = -Math.PI / 2;

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // DEBUG Orbit Controls
  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.addEventListener('change', renderer);
  orbitControls.enableZoom = false;

  // Lighting
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.castShadow = true;
  pointLight.position.set(0, 50, 0);
  scene.add(pointLight);

}

function loadComponents() {
  loader = new THREE.JSONLoader();

  // Machine
  machine = new Machine();

  keyboard = new THREEx.KeyboardState();

  flipperLeft = new Flipper(true);
  // scene.add(flipperLeft.mesh);

  flipperRight = new Flipper(false);
  // scene.add(flipperRight.mesh);

  // Cube
  loader.load('/res/border.json', function(geometry) {
    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var gutterMesh = new THREE.Mesh(geometry, material);
    scene.add(gutterMesh);
    gutterMesh.position.y = 1;
    gutter = new Gutter(new THREE.Vector3(0, 0.1, 0), gutterMesh);
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

