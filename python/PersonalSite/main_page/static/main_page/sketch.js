
var verts = [];
var rotation_factor = 0.004;
var rotation = 0.001;
var widthF = .7;
var heightF = .9;
var dispF = .00015;
function addPermutations(x,y,z){
  addVerts(x,y,z);
  addVerts(z,x,y);
  addVerts(y,z,x);
}
function setup() {
  var canvas = createCanvas(700, 450, WEBGL);
  resizeCanvas(windowWidth*widthF, windowHeight*heightF);
  // canvas.class('d-flex flex-column flex-shrink-0 p-3 bg-light');
  var PHI = (1+sqrt(5))/2;
  addVerts(1,1,1);
  addPermutations(0,1/PHI,PHI);
  edgeLength = 2/PHI;
  dispSz = 90;
  dispSz = ((windowWidth*widthF)*windowHeight*heightF)*dispF
}
class vert{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
function isEdge(vID1, vID2){
  var pres = 1000;
  var v1 = verts[vID1];
  var v2 = verts[vID2];
  var d = sqrt(Math.pow(v1.x-v2.x, 2)+Math.pow(v1.y-v2.y, 2)+Math.pow(v1.z-v2.z, 2))+.00001;
// console.log(d)
  if((Math.round(d * pres)) == Math.round((edgeLength * pres))){
    return true;
  }
  else{
    return false
  }
}
function vLine(v1, v2){
  line(v1.x*dispSz, v1.y*dispSz, v1.z*dispSz, v2.x*dispSz, v2.y*dispSz, v2.z*dispSz);
}
function addVerts(x,y,z){
  verts.push(new vert(x,y,z));
  if(z != 0.0){verts.push(new vert(x,y,z*-1))}
  if(y != 0.0){
    verts.push(new vert(x,y*-1,z));
    if(z != 0.0){verts.push(new vert(x,y*-1,z*-1))}
  }
  if(x != 0.0){
    verts.push(new vert(x*-1,y,z));
    if(z != 0.0){verts.push(new vert(x*-1,y,z*-1))}
    if(y != 0.0){
      verts.push(new vert(x*-1,y*-1,z));
      if(z != 0.0){verts.push(new vert(x*-1,y*-1,z*-1))}
    }
  }
}
function draw() {
  background(225);
  strokeWeight(.75);
  stroke(0);
  fill(0);
  rotateX(rotation);
  rotateY(rotation);
  rotateZ(rotation);
  rotation += rotation_factor;
  
  for(var i = 0; i < verts.length; i++){
    for(var j = i+1; j < verts.length; j++){
      if(isEdge(i,j)){
        vLine(verts[i], verts[j]);
      }
    }
  }
}

function windowResized(){
  resizeCanvas((windowWidth*widthF), (windowHeight*heightF));
  // canvas.width = windowWidth*widthF;
  // canvas.height = windowHeight.heightF;
  dispSz = ((windowWidth*widthF)*(windowHeight*heightF))*dispF
  console.log('window width: '+ windowWidth + ', widthFactor: ' + widthF + ', combined: '+ (windowWidth*widthF));
  console.log('canvas width: ' + canvas.width);

}