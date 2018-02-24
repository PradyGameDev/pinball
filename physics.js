function collided(a, bs) {
    a.mesh().geometry.vertices.forEach(function (vertex) {
        var localVertex = vertex.clone();
        var globalVertex = localVertex.applyMatrix4(a.mesh().matrix);
        var directionVector = globalVertex.sub(a.mesh().position);

        var ray = new THREE.Raycaster(a.mesh().position, directionVector.clone().normalize());

        var collidableMeshes = bs.slice(0);

        ray.intersectObjects(collidableMeshes)
            .filter(res => res.distance < directionVector.length())
            .forEach(a.collidedWith);
    });
}

