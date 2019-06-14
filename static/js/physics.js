var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera(90, 1, 0.1,1000);
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(600, 600);
renderer.domElement.id = 'canv';
document.getElementById("playground").appendChild( renderer.domElement );
var reset = document.getElementById("reset");
// document.addEventListener( 'mousedown', onDocumentMouseDown, false );

camera.up = new THREE.Vector3(0, 0, 1);
camera.position.set(-170,170,40);
camera.zoom = 30;
camera.updateProjectionMatrix();
var center = new THREE.Vector3();
camera.lookAt(center);

var arrows;
var d;
var ori;
var arrow;
var counter;
var num = 8;
var step = 1;
var direction;

function setup(){
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  // var from = new THREE.Vector3(-100,-50,-100);
  // var to = new THREE.Vector3(0,0,0);
  var sourcePos = new THREE.Vector3(0, 20, 0);
  var targetPos = new THREE.Vector3(0, -20, 0);
  var direction = new THREE.Vector3().sub(targetPos, sourcePos);
  var currentArrow = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0x00ff00, 0.2, 0.02);
  currentArrow.line.material.linewidth = 5000;
  scene.add(currentArrow);


  arrows = [];
  d=null;
  ori=null;
  arrow=null;
  counter = 0;

  // arrows
  for (let z = 0; z < num + 1; z+=step) {
    for (let x = 0; x < num + 1; x+=step) {
      // for (let x = Math.pow(100-Math.pow(x, 2)-Math.pow(y, 2), 0.5); z < num + 1; z+=step) {
      for (let y = 0; y < num + 1; y+=step) {
        // var d = new THREE.Vector3(THREE.Math.randFloatSpread(2), THREE.Math.randFloatSpread(2), THREE.Math.randFloatSpread(2)).normalize();
         // Math.pow(100-Math.pow(x, 2)-Math.pow(y, 2), 0.5);
         if (Math.pow(x, 2) + Math.pow(y, 2) == Math.pow(num, 2)) {
          from = new THREE.Vector3(x, y, z).normalize();
          to = new THREE.Vector3(x + 2, y +2, z).normalize();
          // direction = to.clone().sub(from);
          arrow = new THREE.ArrowHelper(from, to, 1,  0x6d2aff, 0.10, 0.2, 0.02);
          // arrow = new THREE.ArrowHelper(from, to, 1,  0xffffff, 0.10, 0.2, 0.02);
          arrows.push(arrow);
          scene.add(arrow);
          counter+=1;
          if (counter > Math.floor(Math.pow(((num+1) / step), 3))) {
            break;
          };
        };
      };
    };
  };
};
setup();

function redraw(){
 cancelAnimationFrame(frameId);
 frameId = requestAnimationFrame(render);
}
redraw();

function clearThree(scene){
  while(scene.children.length > 0){
    clearThree(scene.children[0])
    scene.remove(scene.children[0]);
  }
  if(scene.geometry) scene.geometry.dispose()
  if(scene.material) scene.material.dispose()
  if(scene.texture) scene.texture.dispose()
}

var getChoice = function(e) {
   choice = document.getElementById("options").value;
   clearThree(scene);
   if (choice == "linecur") {
     redraw();
		 //LINE
		 setup();
   }
   if (choice == "movecharge") {
   }
	 if (choice == "loopcur") {
	 }
	 if (choice == "solenoid") {
	 }
 }

 reset.addEventListener('click', function(e){
   clearThree(scene);
 }
 )

var frameId = 0;

render();
function render(){
  requestAnimationFrame(render);
  //scene.rotation.y += clock.getDelta() * 0.1;
  renderer.render(scene, camera);
}


// //Controls: listens for browser mouse events and translates them into drag, zoomIn and zoomOut.
// var Controls = (function(Controls) {
//     "use strict";
//
// 	// Check for double inclusion
// 	if (Controls.addMouseHandler)
// 		return Controls;
//
// 	Controls.addMouseHandler = function (domObject, drag, zoomIn, zoomOut) {
// 		var startDragX = null,
// 		    startDragY = null;
//
// 		function mouseWheelHandler(e) {
// 			e = window.event || e;
// 			var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//
// 			if (delta < 0 && zoomOut) {
// 				zoomOut(delta);
// 			} else if (zoomIn) {
// 				zoomIn(delta);
// 			}
//
// 			e.preventDefault();
// 		}
//
// 		function mouseDownHandler(e) {
// 			startDragX = e.clientX;
// 			startDragY = e.clientY;
//
// 			e.preventDefault();
// 		}
//
// 		function mouseMoveHandler(e) {
// 			if (startDragX === null || startDragY === null)
// 				return;
//
// 			if (drag)
// 				drag(e.clientX - startDragX, e.clientY - startDragY);
//
// 			startDragX = e.clientX;
// 			startDragY = e.clientY;
//
// 			e.preventDefault();
// 		}
//
// 		function mouseUpHandler(e) {
// 			mouseMoveHandler.call(this, e);
// 			startDragX = null;
// 			startDragY = null;
//
// 			e.preventDefault();
// 		}
//
// 		domObject.addEventListener("mousewheel", mouseWheelHandler);
// 		domObject.addEventListener("DOMMouseScroll", mouseWheelHandler);
// 		domObject.addEventListener("mousedown", mouseDownHandler);
// 		domObject.addEventListener("mousemove", mouseMoveHandler);
// 		domObject.addEventListener("mouseup", mouseUpHandler);
// 	};
// 	return Controls;
// }(Controls || {}));
//
// //render stuff
// var renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setSize(600, 600);
// document.getElementById("playground").appendChild( renderer.domElement );
//
// var scene = new THREE.Scene();
// var center = new THREE.Vector3();
// var camera = new THREE.PerspectiveCamera(90, 1, 0.1,1000);
//
// camera.up = new THREE.Vector3(0, 0, 1);
// camera.position.set(-170,170,40);
// camera.lookAt(center);
//
// function drag(deltaX, deltaY) {
// 	var radPerPixel = (Math.PI / 450),
// 			deltaPhi = radPerPixel * deltaX,
// 			deltaTheta = radPerPixel * deltaY,
// 			pos = camera.position.sub(center),
// 			radius = pos.length(),
// 			theta = Math.acos(pos.z / radius),
// 			phi = Math.atan2(pos.y, pos.x);
//
// 	// Subtract deltaTheta and deltaPhi
// 	theta = Math.min(Math.max(theta - deltaTheta, 0), Math.PI);
// 	phi -= deltaPhi;
//
// 	// Turn back into Cartesian coordinates
// 	pos.x = radius * Math.sin(theta) * Math.cos(phi);
// 	pos.y = radius * Math.sin(theta) * Math.sin(phi);
// 	pos.z = radius * Math.cos(theta);
//
// 	camera.position.add(center);
// 	camera.lookAt(center);
// 	redraw();
// }
//
// function zoomIn() {
// 	camera.position.sub(center).multiplyScalar(0.9).add(center);
// 	redraw();
// }
//
// function zoomOut() {
// 	camera.position.sub(center).multiplyScalar(1.1).add(center);
// 	redraw();
// }
//
// Controls.addMouseHandler(renderer.domElement, drag, zoomIn, zoomOut);
//
// var getChoice = function(e) {
//
//    choice = document.getElementById("options").value;
//    if (choice == "linecur") {
//      redraw();
// 		 //LINE
// 		 var from = new THREE.Vector3(-100,-50,-100);
// 		 var to = new THREE.Vector3(0,0,0);
// 		 var direction = to.clone().sub(from);
// 		 var length = direction.length();
// 		 var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 'green');
// 		 arrowHelper.line.material.linewidth = 50;
// 		 scene.add(arrowHelper);
//    }
//    if (choice == "movecharge") {
// 		 redraw();
//    }
// 	 if (choice == "loopcur") {
//
// 	 }
// 	 if (choice == "solenoid") {
//
// 	 }
//  }

/*
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
.on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {

        var deltaRotationQuaternion = new three.Quaternion()
            .setFromEuler(new three.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        line.quaternion.multiplyQuaternions(deltaRotationQuaternion, line.quaternion);
    }

    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

$(document).on('mouseup', function(e) {
    isDragging = false;
});



// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;
function update(dt, t) {
    //console.log(dt, t);

    //camera.position.z += 1 * dt;
    //cube.rotation.x += 1 * dt;
    //cube.rotation.y += 1 * dt;

    setTimeout(function() {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;

        update(dt, totalGameTime);

        lastFrameTime = currTime;
    }, 0);
}


function render() {
    renderer.render(scene, camera);


    requestAnimFrame(render);
}

render();
update(0, totalGameTime);

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}





*/






///////


/*

    void drawCurrentLine(Graphics g, int x1, int y1, int x2, int y2, int n,
			 boolean doArrow, int dir) {
	int i;
	if (dir == -1) {
	    int x3 = x1;
	    int y3 = y1;
	    x1 = x2; y1 = y2;
	    x2 = x3; y2 = y3;
	}
	int x0 = x1;
	int y0 = y1;
	n *= 3;
	for (i = 1; i <= n; i++) {
	    int x = (x2-x1)*i/n + x1;
	    int y = (y2-y1)*i/n + y1;
	    g.setColor(Color.yellow);
	    if (i == n && doArrow && reverse == 1)
		drawCurrentArrow(g, x0, y0, x, y);
	    else if (i == 1 && doArrow && reverse == -1)
		drawCurrentArrow(g, x0, y0, x, y);
	    else {
		g.setColor(getCurrentColor(i));
		g.drawLine(x0, y0, x, y);
	    }
	    x0 = x; y0 = y;
	}
    }
*/






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
