var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var clear = document.getElementById("clear");

clear.addEventListener('click', function(e){
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
    }
)

c.addEventListener('click', function(e){
    console.log("clicked")
}
