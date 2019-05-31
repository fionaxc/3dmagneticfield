var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var reset = document.getElementById("reset");
var rectWidth = 600;
var rectHeight = 600;
var choice;
var canMouseX;
var canMouseY;
var offsetX=c.offsetLeft;
var offsetY=c.offsetTop;
var isDragging=false;
var img = ctx.getImageData(0, 0, rectWidth, rectHeight);
console.log(img)

var newLine = function(e) {
  console.log('draw')
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
  if (choice == "linecur") {
    newLine();
  }
  else {
    //draw other stuff
    ctx.clearRect(0,0,rectWidth,rectHeight);
  }
}

function handleMouseDown(x, y, e){
  // console.log('0')
  canMouseX=parseInt(x-offsetX);
  canMouseY=parseInt(y-offsetY);
  // set the drag flag
  isDragging=true;
}

function handleMouseUp(x, y, e){
  // console.log('1')
  handleMouseDown();
  // clear the drag flag
  isDragging=false;
}

function handleMouseOut(x, y, e){
  // console.log('2')
  canMouseX=parseInt(x-offsetX);
  canMouseY=parseInt(y-offsetY);
  // user has left the canvas, so clear the drag flag
  //isDragging=false;
}

function handleMouseMove(x, y, e){
  // console.log('3')
  canMouseX=parseInt(x-offsetX);
  canMouseY=parseInt(y-offsetY);
  // if the drag flag is set, clear the canvas and draw the image
  if(isDragging){
      ctx.clearRect(0,0,rectWidth,rectHeight);
      // console.log(canMouseX-rectWidth/2+100);
      // console.log(canMouseY-rectHeight/2+100);
      // ctx.putImageData(img,rectWidth, rectHeight, canMouseX-rectWidth/2, canMouseY-rectHeight/2, img.width, img.height);
      if (choice == "linecur") {
        newLine();
      }
      // ctx.drawImage(img,canMouseX-rectWidth/2,canMouseY-rectHeight/2,rectWidth,rectHeight);
  }
}

reset.addEventListener('click', function(e){
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, rectWidth, rectHeight);
}
)

c.addEventListener('mousedown', function(e){
  handleMouseDown(e.clientX, e.clientY)
  }
)

c.addEventListener('mouseup', function(e){
  handleMouseUp(e.clientX, e.clientY)
  }
)

c.addEventListener('mousedown', function(e){
  handleMouseOut(e.clientX, e.clientY)
  }
)

c.addEventListener('mousedown', function(e){
  handleMouseMove(e.clientX, e.clientY)
  }
)

setup();
