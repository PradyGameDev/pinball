class Component
{
    constructor() {
        //Position
        this.position_ = new THREE.Vector3(0, 0, 0);
        //Built in mesh object has geometry and material
        //Mesh has geometry + material
        this.geometry_ = new THREE.BoxGeometry(this.position_); 
        this.color_ = 0x00ff00;
        this.material_ = new THREE.MeshBasicMaterial({color: this.color_}); 
        this.mesh_ = new THREE.Mesh(this.geometry, this.material);
        //Floating point value representing extent of bounciness
        this.bounciness_ = 0.0;
        this.velocity_ = new THREE.Vector3(0, 0, 0);
        this.acceleration_ = new THREE.Vector3(0, 0, 0);
        //Represents the point value of each component. The ball has no pointValue, whereas each of the collidable game objects have a score
        //that gets added to each player's score upon collision.
        this.pointValue_ = 0;
    }

    //Quick initializer
    setup(position, mesh, bounciness, velocity, acceleration, pointValue) {
        this.position_ = position;
        this.mesh_ = mesh; //THREE.js mesh
        this.bounciness_ = bounciness;
        this.velocity_ = velocity;
        this.acceleration_ = acceleration;
        this.pointValue_ = pointValue;
    }

    // In degrees
    rotate(x, y, z) {
        this.mesh_.rotateX(x);
        this.mesh_.rotateY(y);
        this.mesh_.rotateZ(z);
    }

    get position() {
        return this.position_;
    }

    get mesh() {
        return this.mesh_;
    }

    get bounciness() {
        return this.position_;
    }

    get velocity() {
        return this.velocity_;
    }

    get acceleration() {
        return this.acceleration_;
    }

    get pointValue() {
        return this.pointValue_;
    }

    set position(position) {
        this.position_ = position;
    }

    set mesh(mesh) {
        this.mesh_ = mesh;
    }

    set bounciness(bounciness) {
        this.bounciness_ = bounciness;
    }

    set velocity(velocity) {
        this.velocity_ = velocity;
    }

    set acceleration(acceleration) {
        this.acceleration_ = acceleration;
    }

    set pointValue(pointValue) {
        this.pointValue_ = pointValue;
    }

    raycast(raycaster, intersects) {
        return this.mesh_.raycast(raycaster, intersects);
    }

    collidedWith(other) {
        //TODO Implement collision handler
    }
}