var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var reset = document.getElementById("reset");
var rectWidth = 600;
var rectHeight = 600;
var smth = document.getElementById("smth");
var opt = document.getElementById("options")

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
  console.log(opt)
}
)
