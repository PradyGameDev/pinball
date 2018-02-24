var damping = new THREE.Euler(0, 0.4, 0, "XYZ");

function approxeq(x, y) {
    return Math.abs(x - y) < 0.01;
}

class Flipper extends Component {
    constructor(isLeft) {
        super();

        this.isLeft = isLeft;

        this.mesh_ = new THREE.Mesh(this.geometry_, this.material_);
        this.restRotation = this.mesh_.rotation;

        this.rotationalVelocity = new THREE.Euler(0, 0.1, 0, "XYZ");

        this.flipping = false;
    }

    update() {
        var dx = -this.rotationalVelocity.x;
        var dy = -this.rotationalVelocity.y;
        var dz = -this.rotationalVelocity.z;
        this.rotationalVelocity.x += damping.x * dx;
        this.rotationalVelocity.y += damping.y * dy;
        this.rotationalVelocity.z += damping.z * dz;

        this.rotate(this.rotationalVelocity.x, this.rotationalVelocity.y, this.rotationalVelocity.z);

        if (approxeq(this.rotationalVelocity.x, 0) && approxeq(this.rotationalVelocity.y, 0) && approxeq(this.rotationalVelocity.z, 0)) {
            if (this.flipping) {
                if (this.isLeft) {
                    this.rotationalVelocity = new THREE.Euler(0, 18, 0, "XYZ");
                } else {
                    this.rotationalVelocity = new THREE.Euler(0, -18, 0, "XYZ");
                }

                this.goingBack = true;
                this.flipping = false;
            } else if (this.goingBack) {
                this.goingBack = false;
                this.flipping = false;
            }
        }
    }

    flip() {
        if (!this.flipping && !this.goingBack) {
            this.flipping = true;

            if (this.isLeft) {
                this.rotationalVelocity = new THREE.Euler(0, -18, 0, "XYZ");
            } else {
                this.rotationalVelocity = new THREE.Euler(0, 18, 0, "XYZ");
            }
        }
    }
}

