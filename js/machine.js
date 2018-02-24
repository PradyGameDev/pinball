class Machine {
    constructor() {
        this.components = [];

        // Floor
        this.geometry = new THREE.PlaneGeometry(1.113, 1.977, 0, 0);
        this.material = new THREE.MeshLambertMaterial({ color: 0x4CAF50, side: THREE.DoubleSide });
        var floor = new Physijs.ConvexMesh(this.geometry, this.material);

        floor.receiveShadow = true;
        // Flip horizontally
        floor.rotateX(-Math.PI / 2);
        scene.add(floor);
    }

    update() {

    }
}
