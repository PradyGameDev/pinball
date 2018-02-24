var width, height;

var camera, scene, renderer;
var orbitControls;

var jsonLoader;

// Components
var components = [];
var ball, machine;
var border;
var flipperLeft, flipperRight;

var keyboard, clock;

Physijs.scripts.worker = "lib/physijs_worker.js";
Physijs.scripts.ammo = "ammo.js";

init();
function init() {
    initWindow();
    initScene();
    loadComponents();

    keyboard = new THREEx.KeyboardState();
    clock = new THREE.Clock();
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
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -1, 0));

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Tilted
    camera.position.set(0, 2, 1.9);
    camera.rotation.x = -Math.PI / 4;
    // Top down
    // camera.position.set(0, 3, 0);
    // camera.rotation.x = -Math.PI / 2;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    // change resolution of shadow
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
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
}

function loadComponents() {
    loader = new THREE.JSONLoader();

    machine = new Machine();

    // Ball
    var geometry = new THREE.SphereGeometry(0.05, 32, 32);
    var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var mesh = new Physijs.SphereMesh(geometry, material);
    ball = new Ball(new THREE.Vector3(0, 0.05, 0), mesh);
    scene.add(mesh);

    // improve loading mechanism
    var numLoaded = 0;
    var numToLoad = 2;

    loader.load('res/flipper.json', function(geometry) {
        var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

        var mesh_left = new Physijs.ConvexMesh(geometry, material);
        flipperLeft = new Flipper(new THREE.Vector3(0, 0, 0), mesh_left, true);
        scene.add(mesh_left);

        var mesh_right = new Physijs.ConvexMesh(geometry, material);
        flipperRight = new Flipper(new THREE.Vector3(0, 0, 0), mesh_right, false);
        scene.add(mesh_right);

        numLoaded++;
        if (numLoaded == numToLoad) {
            loop();
        }
    });

    loader.load('res/border.json', function(geometry) {
        var material = new THREE.MeshLambertMaterial({ color: 0xA1887F });
        var mesh = new Physijs.ConvexMesh(geometry, material);

        // don't hard code values like 0.39131 or 0.1
        border = new Component(new THREE.Vector3(0, 0, 0), mesh);
        scene.add(mesh);

        numLoaded++;
        if (numLoaded == numToLoad) {
            loop();
        }
    });
}

function loop() {
    update();
    render();
    scene.simulate();
    requestAnimationFrame(loop);
}

function update() {
    var delta = clock.getDelta();

    if (keyboard.pressed("left")) {
        flipperLeft.flip();
    }
    if (keyboard.pressed("right")) {
        flipperRight.flip();
    }

    // Put this in a for loop
    // machine.update();
    // border.update();
    flipperLeft.update(delta);
    flipperLeft.physicsStep(); // make this get called in flipper.update
    flipperRight.update(delta);
    flipperRight.physicsStep();
}

function render() {
    renderer.render(scene, camera);
}
