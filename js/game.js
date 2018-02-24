var width, height;

var camera, scene, renderer;
var orbitControls;

var ball, machine;

// Components
var jsonLoader;
var border;

var flipperLeft, flipperRight;

var keyboard, clock;

init();
function init() {
  initWindow();
  loader = new THREE.JSONLoader();
  initScene();
  loadComponents();

  keyboard = new THREEx.KeyboardState();

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
  camera.position.set(0, 5, 0);
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
  clock = new THREE.Clock();

  loader.load('flipper.json', function(geometry) {
    var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.y = 0.1;
    flipperLeft = new Flipper(new Vector3(0, 0.1, 0), true);
  });

  // Cube
  loader.load('border2.json', function(geometry) {
    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.y = 0.1;
    border = new Component(new THREE.Vector3(0, 0.1, 0), mesh);
  });
}

function loop() {
    control();
    update();
    render();
    requestAnimationFrame(loop);
}

function update() {
    var delta = clock.getDelta();

    machine.update();
    flipperLeft.update(delta);
    flipperLeft.physicsStep();
    flipperRight.update(delta);
    flipperRight.physicsStep();
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