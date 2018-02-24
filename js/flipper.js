var FLIPPER_TIME = 0.1; // seconds
var FLIPPER_BACK_TIME = 0.05; // seconds

function approxeq(x, y) {
    return Math.abs(x - y) < 0.01;
}

class Flipper extends Component {
    constructor(isLeft) {
        super();

        this.isLeft = isLeft;

        this.restRotation = this.mesh.rotation.clone();
        this.targetRotation = this.mesh.rotation;

        this.flipping = false;

        this.t = 0;
    }

    update(dt) {
        var qtarget = new THREE.Quaternion().setFromEuler(this.targetRotation);

        if (this.flipping) {
            this.mesh_.quaternion.slerp(qtarget, Math.min(1, this.t / FLIPPER_TIME));
        } else {
            this.mesh_.quaternion.slerp(qtarget, Math.min(1, this.t / FLIPPER_BACK_TIME));
        }

        this.t += dt;

        if (this.flipping) {
            if (this.t > FLIPPER_TIME) {
                this.targetRotation = this.restRotation;

                this.t = 0;

                this.goingBack = true;
                this.flipping = false;
            }
        } else if (this.goingBack) {
            if (this.t > FLIPPER_BACK_TIME) {
                this.goingBack = false;
                this.flipping = false;
            }
        }
    }

    flip() {
        if (!this.flipping && !this.goingBack) {
            this.flipping = true;

            this.t = 0;

            if (this.isLeft) {
                this.targetRotation = new THREE.Euler(0, -0.8, 0, "XYZ");
            } else {
                this.targetRotation = new THREE.Euler(0, 0.8, 0, "XYZ");
            }
        }
    }
}

