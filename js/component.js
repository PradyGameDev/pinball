class Component {

    constructor(position, mesh) {
        this.position_ = position;
        this.mesh_ = mesh;
        this.mesh_.position.x = this.position_.x;
        this.mesh_.position.y = this.position_.y;
        this.mesh_.position.z = this.position_.z;

        this.geometry_ = new THREE.BoxGeometry(this.position_);
        this.color_ = 0x00ff00;
        this.material_ = new THREE.MeshBasicMaterial({color: this.color_});

        this.bounciness_ = 0.0;
        this.velocity_ = new THREE.Vector3(0, 0, 0);
        this.acceleration_ = new THREE.Vector3(0, 0, 0);

        this.pointValue_ = 0;
    }

    update() {
        // Keep mesh in sync with position
        // cleaner way to do this? are they both vetor3 objects?
        this.mesh_.position.x = this.position_.x;
        this.mesh_.position.y = this.position_.y;
        this.mesh_.position.z = this.position_.z;
    }

    physicsStep() {

    }

    rotate(x, y, z) {
        // In degrees
        this.mesh_.rotateX(THREE.Math.degToRad(x));
        this.mesh_.rotateY(THREE.Math.degToRad(y));
        this.mesh_.rotateZ(THREE.Math.degToRad(z));
    }

    raycast(raycaster, intersects) {
        return this.mesh_.raycast(raycaster, intersects);
    }

    collidedWith(other) {
        // TODO Implement collision handler
        this.mesh_.rotation.x *= -1;
        this.mesh_.rotation.y *= -1;
        this.mesh_.rotation.z *= -1;
    }

    get position() {
        return this.position_;
    }

    set position(position) {
        this.position_ = position;
        this.mesh_.position.x = this.position_.x;
        this.mesh_.position.y = this.position_.y;
        this.mesh_.position.z = this.position_.z;
    }

    get mesh() {
        return this.mesh_;
    }

    set mesh(mesh) {
        this.mesh_ = mesh;
    }

    get bounciness() {
        return this.position_;
    }

    set bounciness(bounciness) {
        this.bounciness_ = bounciness;
    }

    get velocity() {
        return this.velocity_;
    }

    set velocity(velocity) {
        this.velocity_ = velocity;
    }

    get acceleration() {
        return this.acceleration_;
    }

    set acceleration(acceleration) {
        this.acceleration_ = acceleration;
    }

    get pointValue() {
        return this.pointValue_;
    }

    set pointValue(pointValue) {
        this.pointValue_ = pointValue;
    }
}
