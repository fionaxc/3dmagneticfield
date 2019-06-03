var three = THREE;

var scene = new three.Scene();
var camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



var geometry = new three.BoxGeometry(1, 1, 1);
//var material = new three.MeshNormalMaterial();
/* * /
var material = new three.MeshBasicMaterial({
    color: 0x00ff00
});
/* */
/* */
three.ImageUtils.crossOrigin = '';
var texture = three.ImageUtils.loadTexture('http://i.imgur.com/CEGihbB.gif');
texture.anisotropy = renderer.getMaxAnisotropy();

var material = new three.MeshFaceMaterial([
    new three.MeshBasicMaterial({
        color: 0x00ff00
    }),
    new three.MeshBasicMaterial({
        color: 0xff0000
    }),
    new three.MeshBasicMaterial({
        //color: 0x0000ff,
        map: texture
    }),
    new three.MeshBasicMaterial({
        color: 0xffff00
    }),
    new three.MeshBasicMaterial({
        color: 0x00ffff
    }),
    new three.MeshBasicMaterial({
        color: 0xff00ff
    })
]);
/* */

var cube = new three.Mesh(geometry, material);
cube.rotation.x = Math.PI/4;
cube.rotation.y = Math.PI/4;
scene.add(cube);


camera.position.z = 5;

/* */
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

        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }

    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});
/* */

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
