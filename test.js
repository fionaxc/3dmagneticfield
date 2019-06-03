

var renderer = new THREE.WebGLRenderer();
renderer.setSize( 600, 600 );
document.getElementById("playground").appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

var material = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 1,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
} );

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

var line = new THREE.Line( geometry, material );
scene.add( line );
renderer.render( scene, camera );

// camera.position.x = mouseX;
// camera.position.y = mouseY;
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
