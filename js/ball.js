class Ball extends Component {
    constructor(position, mesh) {
        super(position, mesh);
        mesh.castShadow = true;
        mesh.addEventListener( 'collision', onCollision(other, relative_velocity, relative_rotation, contact_normal));
    }
    launch() {
        this.acceleration_ = new THREE.Vector3(0, 0, 2);
        this.mesh_.setLinearVelocity(this.getLinearVelocity() + this.acceleration_);
    }
    update() {
        // Apply gravity
        // Reduce acceleration
        let gravity = new THREE.Vector3(0, -1, 0);
        this.mesh_.setLinearVelocity(this.mesh_.getLinearVelocity() + gravity);
        // Check for collision
    }
    onCollision(other, relative_velocity, relative_rotation, contact_normal)
    {
         // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
         this.setLinearVelocity(relative_velocity * (1.0/ (this.bounciness * other.bounciness)));
         this.pointValue_ += other.pointValue_;
    }
}