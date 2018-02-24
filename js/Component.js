class Component
{
    constructor()
    {
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
    }
    constructor(position, mesh, bounciness, velocity, acceleration)
    {
        this.position = position;
        this.mesh = mesh; //THREE.js mesh
        this.bounciness = bounciness;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    get position()
    {
        return this.position;
    }
    get mesh()
    {
        return this.mesh;
    }
    get bounciness()
    {
        return this.position;
    }
    get velocity()
    {
        return this.velocity;
    }
    get acceleration()
    {
        return this.acceleration;
    }
    set position(position)
    {
        this.position = position;
    }
    set mesh(mesh)
    {
        this.mesh = mesh;
    }
    set bounciness(bounciness)
    {
        this.bounciness = bounciness;
    }
    set velocity(velocity)
    {
        this.velocity = velocity;
    }
    set acceleration(acceleration)
    {
        this.acceleration = acceleration;
    }
    raycasted(raycaster, intersects)
    {
        return this.mesh.raycast(raycaster, intersects);
    }
    collidedWith(other)
    {
        //TODO Implement collision handler
    }
}