class Component
{
    constructor() {
        //Position
        this.position = new THREE.Vector3(0, 0, 0);
        //Built in mesh object has geometry and material
        //Mesh has geometry + material
        this.geometry = new THREE.BoxGeometry(position); 
        this.color = 0x00ff00;
        this.material = new THREE.MeshBasicMaterial({color}); 
        this.mesh = new THREE.Mesh(geometry, material);
        //Floating point value representing extent of bounciness
        this.bounciness = 0.0;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.acceleration = new THREE.Vector3(0, 0, 0);
        //Represents the point value of each component. The ball has no pointValue, whereas each of the collidable game objects have a score
        //that gets added to each player's score upon collision.
        this.pointValue = 0;
    }

    //Initializer
    setup(position, mesh, bounciness, velocity, acceleration, pointValue) {
        this.position = position;
        this.mesh = mesh; //THREE.js mesh
        this.bounciness = bounciness;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.pointValue = pointValue;
    }

    get position() {
        return this.position;
    }

    get mesh() {
        return this.mesh;
    }

    get bounciness() {
        return this.position;
    }

    get velocity() {
        return this.velocity;
    }

    get acceleration() {
        return this.acceleration;
    }

    get pointValue() {
        return this.pointValue;
    }

    set position(position) {
        this.position = position;
    }

    set mesh(mesh) {
        this.mesh = mesh;
    }

    set bounciness(bounciness) {
        this.bounciness = bounciness;
    }

    set velocity(velocity) {
        this.velocity = velocity;
    }

    set acceleration(acceleration) {
        this.acceleration = acceleration;
    }

    set pointValue(pointValue) {
        this.pointValue = pointValue;
    }

    raycast(raycaster, intersects) {
        return this.mesh.raycast(raycaster, intersects);
    }

    collidedWith(other) {
        //TODO Implement collision handler
    }
}