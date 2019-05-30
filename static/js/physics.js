var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var reset = document.getElementById("reset");
var rectWidth = 600;
var rectHeight = 600;
var smth = document.getElementById("smth");
var choice;
var canMouseX;
var canMouseY;

var newLine = function(e) {
  ctx.beginPath();
  ctx.moveTo(100, 100)
  ctx.lineTo(200, 50);
  ctx.strokeStyle = "#FF0000";
  ctx.stroke();
}

var setup = function(e) {
  choice = "linecur";
  newLine();
}

var getChoice = function(e) {
  choice = document.getElementById("options").value;
  console.log(choice)
  // if (choice == "linecur") {
  //   return newLine;
  // }
}

var drag = function(e) {
    var img = ctx.getImageData(0, 0, rectWidth, rectHeight);
    img.onload = function(){
        ctx.putImageData(imgData, 0, 0);
    };

    var offsetX=c.offsetLeft;
    var offsetY=c.offsetTop;
    var isDragging=false;

    function handleMouseUp(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // clear the drag flag
      isDragging=false;
    }

    function handleMouseOut(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // user has left the canvas, so clear the drag flag
      //isDragging=false;
    }

    function handleMouseMove(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging){
          ctx.clearRect(0,0,canvasWidth,canvasHeight);
          ctx.drawImage(img,canMouseX-128/2,canMouseY-120/2,128,120);
      }
    }

    c.onmousedown(function(e){handleMouseDown(e);});
    c.onmousemove(function(e){handleMouseMove(e);});
    c.onmouseup(function(e){handleMouseUp(e);});
    c.onmouseout(function(e){handleMouseOut(e);});
}



reset.addEventListener('click', function(e){
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, rectWidth, rectHeight);
}
)

smth.addEventListener('click', function(e){
  ctx.fillStyle = "#ADD8E6";
  ctx.fillRect(0, 0, rectWidth, rectHeight);
}
)

c.addEventListener('click', function(e){
  drag();
}
)

function handleMouseDown(e){
  console.log('hi')
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // set the drag flag
  isDragging=true;
}

setup();
