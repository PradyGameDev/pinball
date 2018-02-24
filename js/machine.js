function Machine() {
  this.components = [];

  // Floor
  var width = 50;
  var height = 50;
  var geometry = new THREE.PlaneGeometry(width, height, 4, 4);
  var material = new THREE.MeshLambertMaterial({ color: 0x0000ff });

  var floor = new THREE.Mesh(geometry, material);
  floor.receiveShadow = true;
  floor.rotateX(-Math.PI / 2);
  scene.add(floor);
}