class Component {

    constructor(position, mesh) {
        this.mesh_ = mesh;
        this.mesh_.position.x = position.x;
        this.mesh_.position.y = position.y;
        this.mesh_.position.z = position.z;

        this.geometry_ = new THREE.BoxGeometry(this.position_);
        this.color_ = 0x00ff00;
        this.material_ = new THREE.MeshBasicMaterial({color: this.color_});

        this.bounciness_ = 0.0;
        this.acceleration_ = new THREE.Vector3(0, 0, 0);

        this.pointValue_ = 0;
    }

    update() {

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
        this.pointValue_+=other.pointValue_;
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
