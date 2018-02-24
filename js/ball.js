class Ball extends Component {
    constructor(position, mesh) {
        super(position, mesh);
        mesh.castShadow = true;
    }
    launch() {
        let accel = 3;
        this.acceleration_ = new Vector3(0, 0, accel);
        this.velocity_ += this.acceleration_;
    }
    update() {
        // Apply gravity
        if (this.acceleration_ > new Vector3(0, 0, 0))
        {
            this.acceleration_ -= new Vector3(0, 0, .5);
        }
        this.velocity_ -= new Vector3(0, -1, 0);
        // Check for collision
    }
}