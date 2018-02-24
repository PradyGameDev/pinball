var width, height;
var camera, scene, renderer;

var jsonLoader;

var ball, cube, ground;
var orbitControls;

const GRAVITY = new Vector(0, 0.02);

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

  // Ground
  var groundGeometry = new THREE.PlaneGeometry(100, 200, 4, 4);
  var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.receiveShadow = true;
  ground.rotateX(-Math.PI / 2);
  scene.add(ground);

  // Ball
  ball = Ball();

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
  update();
  render();
  requestAnimationFrame(loop);
}

function update() {
  ball.update();
}

function render() {
  renderer.render(scene, camera);
}

function Vector(x, z) {
  this.x = x;
  this.z = z;

  this.add = function(other) {
    this.x += other.x;
    this.z += other.z;
  }
}

function Ball() {
  this.radius = 5;

  this.position = new Vector(0, -60);
  this.velocity = new Vector(0, 0);
  this.acceleration = GRAVITY;

  var geometry = new THREE.SphereGeometry(this.radius, 32, 32);
  var material = new THREE.MeshPhongMaterial();
  this.mesh = new THREE.Mesh(geometry, material);

  scene.add(this.mesh);

  this.update = function() {
    this.velocity.add(acceleration);
    this.position.add(velocity);

    this.mesh.position.set(this.position.x, this.radius, this.position.z);
  }
}
