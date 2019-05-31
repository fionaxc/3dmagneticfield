var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

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


// var c = document.getElementById("playground");
// var ctx = c.getContext("2d");
// var reset = document.getElementById("reset");
// var rectWidth = 600;
// var rectHeight = 600;
// var choice;
// var canMouseX;
// var canMouseY;
// var offsetX=c.offsetLeft;
// var offsetY=c.offsetTop;
// var isDragging=false;
// var img = ctx.getImageData(0, 0, rectWidth, rectHeight);
// console.log(img)
//
// var newLine = function(e) {
//   console.log('draw')
//   ctx.beginPath();
//   ctx.moveTo(100, 100)
//   ctx.lineTo(200, 50);
//   ctx.strokeStyle = "#FF0000";
//   ctx.stroke();
// }
//
// var setup = function(e) {
//   choice = "linecur";
//   newLine();
// }
//
// var getChoice = function(e) {
//
//   choice = document.getElementById("options").value;
//   if (choice == "linecur") {
//     newLine();
//   }
//   else {
//     //draw other stuff
//     ctx.clearRect(0,0,rectWidth,rectHeight);
//   }
// }
//
// function handleMouseDown(x, y, e){
//   // console.log('0')
//   canMouseX=parseInt(x-offsetX);
//   canMouseY=parseInt(y-offsetY);
//   // set the drag flag
//   isDragging=true;
// }
//
// function handleMouseUp(x, y, e){
//   // console.log('1')
//   handleMouseDown();
//   // clear the drag flag
//   isDragging=false;
// }
//
// function handleMouseOut(x, y, e){
//   // console.log('2')
//   canMouseX=parseInt(x-offsetX);
//   canMouseY=parseInt(y-offsetY);
//   // user has left the canvas, so clear the drag flag
//   //isDragging=false;
// }
//
// function handleMouseMove(x, y, e){
//   // console.log('3')
//   canMouseX=parseInt(x-offsetX);
//   canMouseY=parseInt(y-offsetY);
//   // if the drag flag is set, clear the canvas and draw the image
//   if(isDragging){
//       ctx.clearRect(0,0,rectWidth,rectHeight);
//       // console.log(canMouseX-rectWidth/2+100);
//       // console.log(canMouseY-rectHeight/2+100);
//       // ctx.putImageData(img,rectWidth, rectHeight, canMouseX-rectWidth/2, canMouseY-rectHeight/2, img.width, img.height);
//       if (choice == "linecur") {
//         newLine();
//       }
//       // ctx.drawImage(img,canMouseX-rectWidth/2,canMouseY-rectHeight/2,rectWidth,rectHeight);
//   }
// }
//
// reset.addEventListener('click', function(e){
//   ctx.fillStyle = "#000000";
//   ctx.fillRect(0, 0, rectWidth, rectHeight);
// }
// )
//
// c.addEventListener('mousedown', function(e){
//   handleMouseDown(e.clientX, e.clientY)
//   }
// )
//
// c.addEventListener('mouseup', function(e){
//   handleMouseUp(e.clientX, e.clientY)
//   }
// )
//
// c.addEventListener('mousedown', function(e){
//   handleMouseOut(e.clientX, e.clientY)
//   }
// )
//
// c.addEventListener('mousedown', function(e){
//   handleMouseMove(e.clientX, e.clientY)
//   }
// )
//
// setup();
