var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
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

camera.up = new THREE.Vector3(0, 1, 0);
camera.position.set(100,100,100);
camera.zoom = 10;
camera.updateProjectionMatrix();
var center = new THREE.Vector3();
camera.lookAt(center);

var angle;
var arrows;
var current;
var d;
var ori;
var arrow ;
var num = 10;
var step = 1;
var direction;

currentrange.addEventListener("click", function(e){
  updateAngle();
})

function updateAngle(){
  var current = document.getElementById("currentrange").value;
  angle = (current < 0 ? 90 : -90);
  clearThree(scene);
  setup1();
}


function setup1(){

  var slider = document.getElementById("currentrange");
  var output = document.getElementById("currentslider");
  output.innerHTML = slider.value;

  slider.oninput = function(){
    output.innerHTML = this.value;
  }

  current = output.innerHTML;

  var axesHelper = new THREE.AxesHelper( 3 );
  scene.add( axesHelper );
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  // var from = new THREE.Vector3(-100,-50,-100);ow
  // var to = new THREE.Vector3(0,0,0);
  var sourcePos = new THREE.Vector3(0, 0, 10);
  var targetPos = new THREE.Vector3(0, 0, -10);
  var direction = new THREE.Vector3().sub(targetPos, sourcePos);
  var currentArrow = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, direction.length(), 0x00ff00, 0.2, 1);
  currentArrow.line.material.linewidth = 50;
  scene.add(currentArrow);


  arrows = [];
  d=null;
  ori=null;
  arrow=null;

  // arrows
  // for (let num=10; num<16; num+=1) {
    for (let z = -10; z < 10; z+=2) {
      for (let x = -num; x < num + 1; x+=step) {
        for (let y = -num; y < num + 1; y+=step) {
           if (Math.pow(x, 2) + Math.pow(y, 2) == Math.pow(num, 2)) {
            for (let i = -10; i < 10; i+=2) {
              from = new THREE.Vector3(x+i, y+i, z)
              // to = new THREE.Vector3(x+1, y+1+i, z)
              to = new THREE.Vector3(x+i, y+i, z)
              var currentPos = new THREE.Vector3(0,0,z);
              direction = new THREE.Vector3().sub(to, currentPos);
              //rotate 90 degrees to get normal Vector
              var axis = new THREE.Vector3(0,0,1);
              direction.applyAxisAngle(axis, angle);
              arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 2,  0x6d2aff, 0.10, 0.2, 0.2);
              arrows.push(arrow);
              scene.add(arrow);
          };
        };
      };
    };
  };
}

function setup2(){
  var axesHelper = new THREE.AxesHelper( 3 );
  scene.add( axesHelper );
  var geometry = new THREE.SphereGeometry( 1, 8, 8 );
  var material = new THREE.MeshBasicMaterial( {color: 0xFFA500} );
  var sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  var dir = new THREE.Vector3( 0, 0, -10 );
  //normalize the direction vector (convert to vector of length 1)
  dir.normalize();
  var origin = new THREE.Vector3( 0, 0, 0 );
  var arrowHelper = new THREE.ArrowHelper( dir, origin, 10, 0x00ff00, 0.2, 0.5 );
  scene.add( arrowHelper );

  arrows = [];
  d=null;
  ori=null;
  arrow=null;

  // arrows
  for (let z = -10; z < 10; z+=step) {
    for (let x = -num; x < num + 1; x+=step) {
      for (let y = -num; y < num + 1; y+=step) {
         if (Math.pow(x, 2) + Math.pow(y, 2) == Math.pow(num, 2)) {
           for (let i = -10; i < 10; i+=2) {
              from = new THREE.Vector3(x+i, y+i, z)
              to = new THREE.Vector3(x+i, y+i, z)
              var currentPos = new THREE.Vector3(0,0,z);
              direction = new THREE.Vector3().sub(to, currentPos);
              //rotate 90 degrees to get normal Vector
              var axis = new THREE.Vector3(0,0,1);
              direction.applyAxisAngle(axis, -90);
              arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
              arrows.push(arrow);
              scene.add(arrow);
          };
        };
      };
    };
  };

}

function setup3(){
  var axesHelper = new THREE.AxesHelper( 3 );
  scene.add( axesHelper );
  // var geometry = new THREE.SphereGeometry( 1, 8, 8 );
  // var material = new THREE.MeshBasicMaterial( {color: 0xFFA500} );
  // var sphere = new THREE.Mesh( geometry, material );
  // scene.add( sphere );
  var radius = 6;
  const disc = new THREE.EdgesGeometry(new THREE.CircleGeometry(radius, 30));
  const lineMaterial = new THREE.LineBasicMaterial({
       transparent: true,
       color: 0xAFEEEE,
       linewidth: 50,
  });
  const circ = new THREE.LineSegments(disc, lineMaterial);
  circ.rotation.z = THREE.Math.degToRad(90);
  scene.add(circ);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  // for (let z = -10; z < 10; z+=step) {
  //   for (let x = -num; x < num + 1; x+=step) {
  //     for (let y = -num; y < num + 1; y+=step) {
  //        if (Math.pow(x, 2) + Math.pow(y, 2) == Math.pow(num, 2)) {
  //          for (let i = -10; i < 10; i+=2) {
  //             from = new THREE.Vector3(x+i, y+i, z)
  //             to = new THREE.Vector3(x + i, y + i, z)
  //             var currentPos = new THREE.Vector3(0,0,z);
  //             direction = new THREE.Vector3().sub(to, currentPos);
  //             //rotate 90 degrees to get normal Vector
  //             var axis = new THREE.Vector3(0,0,1);
  //             direction.applyAxisAngle(axis, -90);
  //             arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
  //             arrows.push(arrow);
  //             scene.add(arrow);
  //         };
  //       };
  //     };
  //   };
  // };

  arrows = [];
  d=null;
  ori=null;
  arrow=null;
  var cur = 0;
  var currentPos;

  //straight diamond

  for (let y = -radius; y < radius+1; y+=step) {
    for (let z = -2; z < 3; z+=step+0.5) {
      cur = 0;
      for (let x = -radius; x < radius+1; x+=step) {
        if (cur < radius-Math.abs(y)+1) {
          draw_arrow(x+radius, y, z);
          draw_arrow(-x-radius, y, z);
      }
      cur +=1
    }
    }
  }

  function draw_arrow(x, y, z) {
    from = new THREE.Vector3(x, y, z)
    to = new THREE.Vector3(x, y, z+1)
    currentPos = new THREE.Vector3(x,y,z);
    direction = new THREE.Vector3().sub(to, currentPos);
    //rotate 90 degrees to get normal Vector
    var axis = new THREE.Vector3(0,0,1);
    direction.applyAxisAngle(axis, 90);
    arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
    arrows.push(arrow);
    scene.add(arrow);
  }

  // var dir = new THREE.Vector3( 0, 0, -20 );
  // //normalize the direction vector (convert to vector of length 1)
  // dir.normalize();
  // var origin = new THREE.Vector3( 0, 0, 0 );
  // var arrowHelper = new THREE.ArrowHelper( dir, origin, 10, 0x6d2aff );
  // scene.add( arrowHelper );


}

function setup4() {
  var axesHelper = new THREE.AxesHelper( 3 );
  scene.add( axesHelper );
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  var rbnWidth = .1;
  var rbnThickness = 0.05;
  var rbnSteps = 10;
  var rbnStepLength = 2;
  var rbnSegsPerStep = 50;
  var rbnRadius = 5;
  var radius;

  var rbnGeom = new THREE.BoxGeometry(rbnSteps * Math.PI * 2, rbnWidth, rbnThickness, rbnSteps * rbnSegsPerStep, 1, 1);
  rbnGeom.computeBoundingBox();
  var size = new THREE.Vector3();
  rbnGeom.boundingBox.getSize(size);
  rbnGeom.translate(size.x * 0.5, size.y * 0.5, size.z * 0.5);

  // bend it!

  rbnGeom.vertices.forEach(v => {
    let angle = -v.x;
    radius = rbnRadius + v.z;
    let shift = (v.x / (Math.PI * 2)) * rbnStepLength + v.y;
    v.x = Math.cos(angle) * radius;
    v.y = shift;
    v.z = Math.sin(angle) * radius;
  });
  rbnGeom.computeFaceNormals();
  rbnGeom.computeVertexNormals();
  rbnGeom.center();
  var ribbon = new THREE.Mesh(rbnGeom, new THREE.MeshBasicMaterial({color: 0xAFEEEE}));
  scene.add(ribbon);

  arrows = [];
  d=null;
  ori=null;
  arrow=null;


  //straight diamond

  for (let y = -radius; y < radius+1; y+=step) {
    for (let z = -2; z < 3; z+=step+0.5) {
      cur = 0;
      for (let x = -radius; x < radius+1; x+=step) {
        if (cur < radius-Math.abs(y)+1) {
          draw_arrow(x+radius, y, z);
          draw_arrow(-x-radius, y, z);
      }
      cur +=1
    }
    }
  }

  function draw_arrow(x, y, z) {
    from = new THREE.Vector3(x, y, z)
    to = new THREE.Vector3(x, y, z+1)
    currentPos = new THREE.Vector3(x,y,z);
    direction = new THREE.Vector3().sub(to, currentPos);
    //rotate 90 degrees to get normal Vector
    var axis = new THREE.Vector3(0,0,1);
    direction.applyAxisAngle(axis, 90);
    arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
    arrows.push(arrow);
    scene.add(arrow);
  }
}


function redraw(){
 cancelAnimationFrame(frameId);
 frameId = requestAnimationFrame(render);
}


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
     updateAngle();
     setup1();
   }
   if (choice == "movecharge") {
     redraw();
     setup2();
   }
	 if (choice == "loopcur") {
     redraw();
     setup3();
	 }
	 if (choice == "solenoid") {
     redraw();
     setup4();
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
