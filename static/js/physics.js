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
camera.position.set(0,0,100);
camera.zoom = 10;
camera.updateProjectionMatrix();
var center = new THREE.Vector3();
camera.lookAt(center);

var angle;
var arrows;
var current;
var fstrength;
var d;
var ori;
var arrow ;
var num = 10;
var step = 1;
var direction;
var vdens;
var bval;
var length;
var rbnRadius;
var rbnSteps;
var rbnStepLength;
var loop_radius;

currentrange.addEventListener("click", function(e){
  var choice = document.getElementById("options").value;
  if (choice == "linecur") {
    updateAngle();
  }
})

function updateAngle(){
  current = document.getElementById("currentrange").value;
  angle = (current < 0 ? 90 : -90);
  clearThree(scene);
  setup1();
}

lengthrange.addEventListener("click", function(e){
  var choice = document.getElementById("options").value;
  if (choice == "linecur" || choice == "solenoid"){
    updateLength();
  }
})

function updateLength(){
  var choice = document.getElementById("options").value;
  clearThree(scene);
  if (choice == "linecur"){
    length = document.getElementById("lengthrange").value;
    setup1();
  }
  else {
    rbnSteps = document.getElementById("lengthrange").value/3;
    setup4();
  }
}

vectordensity.addEventListener("click", function(e){
  var choice = document.getElementById("options").value;
  if (choice == "linecur") {
    updateVdens1();
  }
  if (choice == "movecharge") {
    updateVdens2();
  }
  if (choice == "loopcur") {
    updateVdens3();
  }
  if (choice == "solenoid") {
    updateVdens4();
  }
})

function updateVdens1(){
  vdens = document.getElementById("vectordensity").value/5;
  clearThree(scene);
  setup1();
}

function updateVdens2(){
  vdens = document.getElementById("vectordensity").value;
  clearThree(scene);
  setup2();
}

function updateVdens3(){
  vdens = document.getElementById("vectordensity").value;
  clearThree(scene);
  setup3();
}

function updateVdens4(){
  vdens = document.getElementById("vectordensity").value;
  clearThree(scene);
  setup4();
}

document.getElementById("radiusrange").addEventListener("click", function(e){
  var choice = document.getElementById("options").value;
  console.log('changing');
  if (choice == "solenoid"){
    updateRadius1();
  }
  else if (choice == "loopcur"){
    updateRadius2();
  }
})

function updateRadius1(){
  rbnRadius = document.getElementById("radiusrange").value;
  clearThree(scene);
  setup4();
}

function updateRadius2(){
  loop_radius = document.getElementById("radiusrange").value;
  clearThree(scene);
  setup3();
}

document.getElementById("turnrange").addEventListener("click", function(e){
  var choice = document.getElementById("options").value;
  console.log('changing');
  if (choice == "solenoid"){
    updateTurns();
  }
})

function updateTurns(){
  rbnStepLength = document.getElementById("turnrange").value;
  clearThree(scene);
  setup4();
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
  var sourcePos = new THREE.Vector3(0, 0, length);
  var targetPos = new THREE.Vector3(0, 0, -1 * length);
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
    for (let z = -1 * length; z < length; z+=step/vdens) {
      for (let x = -num; x < num + 1; x+=step) {
        for (let y = -num; y < num + 1; y+=step) {
           if (Math.pow(x, 2) + Math.pow(y, 2) == Math.pow(num, 2)) {
            for (let i = -10; i < 10; i+=2) {
              from = new THREE.Vector3(x+i, y+i, z)
              // to = new THREE.Vector3(x+1, y+1+i, z)
              to = new THREE.Vector3(x+i, y+i, z)
              var currentPos = new THREE.Vector3(0,0,z);
              direction = new THREE.Vector3().subVectors(to, currentPos);
              //rotate 90 degrees to get normal Vector
              var axis = new THREE.Vector3(0,0,1);
              direction.applyAxisAngle(axis, angle);
              var material = new THREE.LineBasicMaterial( {
                color: 0x6d2aff,
                linewidth: 5,
              } )
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
  for (let z = -10; z < 10; z+=step/vdens) {
    for (let x = -num; x < num + 1; x+=step) {
      for (let y = -num; y < num + 1; y+=step) {
         if (Math.pow(x, 2) + Math.pow(y, 2) == Math.pow(num, 2)) {
           for (let i = -10; i < 10; i+=2) {
              from = new THREE.Vector3(x+i, y+i, z)
              to = new THREE.Vector3(x+i, y+i, z)
              var currentPos = new THREE.Vector3(0,0,z);
              direction = new THREE.Vector3().subVectors(to, currentPos);
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
  var slider = document.getElementById("radiusrange");
  var output = document.getElementById("radslider");
  output.innerHTML = slider.value;
  slider.oninput = function(){
    output.innerHTML = this.value;
  }
  loop_radius = output.innerHTML;

  var axesHelper = new THREE.AxesHelper( 3 );
  scene.add( axesHelper );
  // var geometry = new THREE.SphereGeometry( 1, 8, 8 );
  // var material = new THREE.MeshBasicMaterial( {color: 0xFFA500} );
  // var sphere = new THREE.Mesh( geometry, material );
  // scene.add( sphere );
  const disc = new THREE.EdgesGeometry(new THREE.CircleGeometry(loop_radius, 30));
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

  loop_radius = parseInt(loop_radius)

  //straight diamond

  for (let y = -loop_radius; y < loop_radius+1; y+=step) {
    for (let z = -3; z < 4; z+=step+0.5) {
      cur = 0;
      for (let x = -loop_radius; x < loop_radius+1; x+=step) {
        if (cur < loop_radius-Math.abs(y)+1) {
          draw_arrow(-x-loop_radius, y, z);
          draw_arrow(x+loop_radius, y, z);
          // draw_arrow(-x-radius, y, z);
      };
      cur +=1
    };
  };
};

  function draw_arrow(x, y, z) {
    from = new THREE.Vector3(x, y, z)
    to = new THREE.Vector3(x, y, z+1)
    currentPos = new THREE.Vector3(x,y,z);
    direction = new THREE.Vector3().subVectors(to, currentPos);
    //rotate 90 degrees to get normal Vector
    var axis = new THREE.Vector3(0,0,1);
    direction.applyAxisAngle(axis, 90);
    arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
    arrows.push(arrow);
    scene.add(arrow);
  }

  for (let xrad = 5; xrad < 8; xrad+=step) {
    draw_ellipse_arrows('x', xrad);
    draw_ellipse_arrows('x', -xrad);
    draw_ellipse_arrows('z', xrad);
    draw_ellipse_arrows('z', -xrad);
  }

  function draw_ellipse_arrows(axis, val){
    var ax=0;
    var ay=0;
    var xrad=0;
    var yrad=0;
    var zrad=0;
    if (axis=='x') {
      xrad=val;
      ax=-xrad;
      xrad=(xrad < 0 ? -xrad : xrad);
      zrad=2*xrad;
      for (let x=-num; x<num+1; x+=1) {
        for (let z=-num; z<num+1; z+=1) {
          if (Math.pow(x, 2)/Math.pow(xrad, 2) + Math.pow(z, 2)/Math.pow(zrad, 2) == 1) {
             from = new THREE.Vector3(x+ax, 0, z+ay);
             to = new THREE.Vector3(x+ax, 0, z+ay);
             var currentPos = new THREE.Vector3(x+ax,0,z+ay);
             direction = new THREE.Vector3().subVectors(to, currentPos);
             //rotate 90 degrees to get normal Vector
             var axis = new THREE.Vector3(0, 1, 0);
             direction.applyAxisAngle(axis, 90);
             arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
             arrows.push(arrow);
             scene.add(arrow);
         };
       };
     };
    }
    else{
      yrad=val;
      ay=-yrad;
      yrad=(yrad < 0 ? -yrad : yrad);
      xrad=2*yrad;
      for (let x=-num; x<num+1; x+=1) {
        for (let y=-num; y<num+1; y+=1) {
          if (Math.pow(x, 2)/Math.pow(xrad, 2) + Math.pow(y, 2)/Math.pow(yrad, 2) == 1) {
             from = new THREE.Vector3(x+ax, y+ay, 0);
             to = new THREE.Vector3(x+ax, y+ay, 0);
             var currentPos = new THREE.Vector3(x+ax,y+ay,0);
             direction = new THREE.Vector3().subVectors(to, currentPos);
             //rotate 90 degrees to get normal Vector
             var axis = new THREE.Vector3(0,0,1);
             direction.applyAxisAngle(axis, 90);
             arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
             arrows.push(arrow);
             scene.add(arrow);
         };
       };
     };
   };
 }
 //    for (let x=-num; x<num+1; x+=1) {
 //      for (let y=-num; y<num+1; y+=1) {
 //        if (Math.pow(x, 2)/Math.pow(xrad, 2) + Math.pow(y, 2)/Math.pow(yrad, 2) == 1) {
 //           from = new THREE.Vector3(x+ax, y+ay, 0);
 //           to = new THREE.Vector3(x+ax, y+ay, 0);
 //           var currentPos = new THREE.Vector3(x+ax,y+ay,0);
 //           direction = new THREE.Vector3().subVectors(to, currentPos);
 //           //rotate 90 degrees to get normal Vector
 //           var axis = new THREE.Vector3(1,0,0);
 //           direction.applyAxisAngle(axis, -90);
 //           arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
 //           if (axis=='x') {
 //             arrow.rotation.x = Math.PI/2;
 //           }
 //           else {
 //             arrow.rotation.y = Math.PI/2;
 //           }
 //           arrows.push(arrow);
 //           scene.add(arrow);
 //       };
 //     };
 //   };
 // };

  // for (let x = -num; x < num+1; x+=1) {
  //   for (let z = -num; z < num+1; z+=1) {
  //      if (Math.pow(x, 2)/Math.pow(5, 2) + Math.pow(z, 2)/100 == 1) {
  //         from = new THREE.Vector3(x-5, 0, z)
  //         to = new THREE.Vector3(x-5, 0, z)
  //         var currentPos = new THREE.Vector3(x-5,0,z);
  //         direction = new THREE.Vector3().subVectors(to, currentPos);
  //         //rotate 90 degrees to get normal Vector
  //         var axis = new THREE.Vector3(0,0,1);
  //         direction.applyAxisAngle(axis, -90);
  //         arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
  //         arrows.push(arrow);
  //         scene.add(arrow);
  //     };
  //   };
  // };

  for (let i = loop_radius/2; i < loop_radius/2+5; i+=step) {
    draw_ellipse('x',i);
    draw_ellipse('x',-i);
    draw_ellipse('y',i);
    draw_ellipse('y',-i);
  }
  function draw_ellipse(axis, val) {
    var ax=0;
    var ay=0;
    var xrad=0;
    var yrad=0;
    if (axis=='x') {
      xrad = val;
      ax=-xrad;
      xrad = (xrad < 0 ? -xrad : xrad);
      yrad = 2*xrad;
    }
    else{
      yrad = val;
      ay=-yrad;
      yrad = (yrad < 0 ? -yrad : yrad);
      xrad=2*yrad;
    }
    var curve = new THREE.EllipseCurve(
      ax,  ay,            // ax, aY
      xrad, yrad,           // xRadius, yRadius
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );

    var points = curve.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );

    var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry, material );
    scene.add(ellipse);
    if (axis=='x') {
      ellipse.rotation.x = Math.PI/2;
    }
    else {
      ellipse.rotation.y = Math.PI/2;
    }
  }

  var dir = new THREE.Vector3( 0, 0, -20 );
  //normalize the direction vector (convert to vector of length 1)
  dir.normalize();
  var origin = new THREE.Vector3( 0, 0, 0 );
  var arrowHelper = new THREE.ArrowHelper( dir, origin, 10, 0x6d2aff );
  scene.add( arrowHelper );


}

function setup4() {

  var slider = document.getElementById("radiusrange");
  var output = document.getElementById("radslider");
  output.innerHTML = slider.value;

  slider.oninput = function(){
    output.innerHTML = this.value;
  }

  rbnRadius = output.innerHTML;

  var slider2 = document.getElementById("lengthrange");
  var output2 = document.getElementById("lengthslider");
  output2.innerHTML = slider2.value;

  slider2.oninput = function(){
    output2.innerHTML = this.value;
  }

  rbnSteps = output2.innerHTML/3;

  var slider3 = document.getElementById("turnrange");
  var output3 = document.getElementById("turnslider");
  output3.innerHTML = slider3.value;

  slider3.oninput = function(){
    output3.innerHTML = this.value;
  }

  rbnStepLength = 6-output3.innerHTML;

  var axesHelper = new THREE.AxesHelper( 3 );
  scene.add( axesHelper );
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  var rbnWidth = .1;
  var rbnThickness = 0.05;
  // var rbnSteps = 10;
  // var rbnStepLength = 2;
  var rbnSegsPerStep = 50;
  var radius;

  var rbnGeom = new THREE.BoxGeometry(rbnSteps * Math.PI * 2, rbnWidth, rbnThickness, rbnSteps * rbnSegsPerStep, 1, 1);
  rbnGeom.computeBoundingBox();
  var size = new THREE.Vector3();
  rbnGeom.boundingBox.getSize(size);
  rbnGeom.translate(size.x * 0.5, size.y * 0.5, size.z * 0.5);

  // bend it!

  rbnGeom.vertices.forEach(v => {
    let angle = -v.x;
    radius = (rbnRadius + v.z)/10;
    console.log(v.z)
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

  yval = rbnSteps*rbnStepLength;

  for (let y = -yval/2; y < yval/2; y+=step+0.5) {
    for (let z = -radius/2; z < radius/2+1; z+=step) {
      for (let x = -radius/2; x < radius/2+1; x+=step) {
        draw_arrow(x, y, z);
        draw_arrow(-x, y, z);
      }
    }
  }

  function draw_arrow(x, y, z) {
    from = new THREE.Vector3(x, y, z)
    to = new THREE.Vector3(x, y, z)
    currentPos = new THREE.Vector3(x,y,z);
    direction = new THREE.Vector3().subVectors(to, currentPos);
    //rotate 90 degrees to get normal Vector
    var axis = new THREE.Vector3(0,0,1);
    direction.applyAxisAngle(axis, 90);
    arrow = new THREE.ArrowHelper(direction.clone().normalize(),from, 1,  0x6d2aff, 0.10, 0.2, 0.2);
    arrows.push(arrow);
    scene.add(arrow);
  }

  for (let i = radius; i < radius+5; i+=step) {
    draw_ellipse('z',i);
  }
  function draw_ellipse(axis, val) {
    var ax=0;
    var ay=0;
    var xrad=0;
    var yrad=0;
    if (axis=='x') {
      xrad = val;
      ax=-xrad;
      xrad = (xrad < 0 ? -xrad : xrad);
      yrad = 2*xrad;
    }
    else{
      yrad = val;
      ay=-yrad;
      yrad = (yrad < 0 ? -yrad : yrad);
      xrad=2*yrad;
    }
    var curve = new THREE.EllipseCurve(
      ax,  ay,            // ax, aY
      xrad, yrad,           // xRadius, yRadius
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );

    var points = curve.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );

    var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

    // Create the final object to add to the scene
    var ellipse = new THREE.Line( geometry, material );
    scene.add(ellipse);
    if (axis=='x') {
      ellipse.rotation.x = Math.PI/2;
    }
    else {
      ellipse.rotation.y = Math.PI/2;
    }
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
     updateVdens1();
     updateLength();
     setup1();
   }
   if (choice == "movecharge") {
     redraw();
     updateVdens2();
     setup2();
   }
	 if (choice == "loopcur") {
     redraw();
     updateVdens3();
     setup3();
	 }
	 if (choice == "solenoid") {
     redraw();
     updateVdens4();
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
