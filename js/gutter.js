class Gutter extends Component {
  constructor() {
    loader.load('res/gutter.json', function(geometry) {
      var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(10, 10, 10);
      mesh.position.set(-20, 5, 20);
      scene.add(mesh);
    });
  }
}