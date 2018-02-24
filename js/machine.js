class Machine {
    constructor() {
        this.components = [];

        // Floor
        var width = 2;
        var height = 2;
        this.geometry = new THREE.PlaneGeometry(width, height, 4, 4);
        this.material = new THREE.MeshLambertMaterial({ color: 0x0000ff });

        var floor = new THREE.Mesh(this.geometry, this.material);
        floor.receiveShadow = true;
        floor.rotateX(-Math.PI / 2);
        scene.add(floor);
    }

    update() {

    }
}
