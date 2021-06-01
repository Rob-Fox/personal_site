
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
let img1, img2, img3, img4, img5, img6, slider_x, slider_y, r_check;
function preload(){
  img1 = loadImage(static_url+'main_page/up.png');
  img2 = loadImage(static_url+'main_page/down.png');
  img3 = loadImage(static_url+'main_page/neutral.png');
  img4 = loadImage(static_url+'main_page/foxHead.png');
  img5 = loadImage(static_url+'main_page/foxHead.png');
  img6 = loadImage(static_url+'main_page/foxHead.png');
}
function setup() {
  clear();
  angleMode(DEGREES);
  var canvas = createCanvas(700, 450, WEBGL);
  resizeCanvas(windowWidth*widthF, windowWidth*widthF);
  var PHI = (1+sqrt(5))/2;
  addVerts(1,1,1);
  // addPermutations(0,1/PHI,PHI);
  edgeLength = 2/PHI;
  dispSz = 90;
  dispSz = ((windowWidth*widthF)*windowHeight*heightF)*dispF
  slider_x = createSlider(-180, 180, 0);
  // slider_x.
  slider_y = createSlider(-180, 180, 0);
  r_check = createCheckbox('auto rotate', true);
  r_check.changed(ch);
  var cv = document.getElementById('main');
  cv.appendChild(slider_x.elt);
  cv.appendChild(slider_y.elt);
  cv.appendChild(r_check.elt);
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
var line_arr = []
function vLine(v1, v2){
  line(v1.x*dispSz, v1.y*dispSz, v1.z*dispSz, v2.x*dispSz, v2.y*dispSz, v2.z*dispSz);
  line_arr.push([v1, v2])
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
var face_line_arr = [];
async function asyncFace(line, line_arr, face_line_arr){
  let result = await find_pentagon(line, line_arr, face_line_arr);
  return result;
}
let flag = true;
function draw() {
  // image(img2, 0, 0);


  // line_arr = [];
  background(225);
  // ambientLight(255);
  // strokeWeight(.75);
  stroke(0);
  fill(255);
  if(flag){
    rotateX(rotation);
    rotateY(rotation);
    slider_x.value(rotation);
    slider_y.value(rotation);
    rotation += rotation_factor*200;
    if(rotation > 180){
      rotation-=360;
    }
  }
  else{
    rotateX(slider_x.value());
    rotateY(slider_y.value());
  }
  // rotateZ(rotation);
  
  // for(var i = 0; i < verts.length; i++){
  //   for(var j = i+1; j < verts.length; j++){
  //     if(isEdge(i,j)){
  //       vLine(verts[i], verts[j]);
  //     }
  //   }
  // }

  // side 1 top
  texture(img1);
  textureMode(NORMAL);
  beginShape();
  vertex(verts[0].x*dispSz, verts[0].y*dispSz, verts[0].z*dispSz, 0, 0);
  vertex(verts[2].x*dispSz, verts[2].y*dispSz, verts[2].z*dispSz, 1, 0);
  vertex(verts[6].x*dispSz, verts[6].y*dispSz, verts[6].z*dispSz, 1, 1);
  vertex(verts[4].x*dispSz, verts[4].y*dispSz, verts[4].z*dispSz, 0, 1);
  endShape(CLOSE);
  // side 2 front
  texture(img2);
  textureMode(NORMAL);
  beginShape();
  vertex(verts[0].x*dispSz, verts[0].y*dispSz, verts[0].z*dispSz, 0, 0);
  vertex(verts[1].x*dispSz, verts[1].y*dispSz, verts[1].z*dispSz, 1, 0);
  vertex(verts[5].x*dispSz, verts[5].y*dispSz, verts[5].z*dispSz, 1, 1);
  vertex(verts[4].x*dispSz, verts[4].y*dispSz, verts[4].z*dispSz, 0, 1);
  endShape(CLOSE);
  // side 3 left
  texture(img3);
  textureMode(NORMAL);
  beginShape();
  vertex(verts[0].x*dispSz, verts[0].y*dispSz, verts[0].z*dispSz, 0, 0);
  vertex(verts[1].x*dispSz, verts[1].y*dispSz, verts[1].z*dispSz, 1, 0);
  vertex(verts[3].x*dispSz, verts[3].y*dispSz, verts[3].z*dispSz, 1, 1);
  vertex(verts[2].x*dispSz, verts[2].y*dispSz, verts[2].z*dispSz, 0, 1);
  endShape(CLOSE);
  // side 4 right
  texture(img4);
  textureMode(NORMAL);
  beginShape();
  vertex(verts[4].x*dispSz, verts[4].y*dispSz, verts[4].z*dispSz, 0, 0);
  vertex(verts[5].x*dispSz, verts[5].y*dispSz, verts[5].z*dispSz, 1, 0);
  vertex(verts[7].x*dispSz, verts[7].y*dispSz, verts[7].z*dispSz, 1, 1);
  vertex(verts[6].x*dispSz, verts[6].y*dispSz, verts[6].z*dispSz, 0, 1);
  endShape(CLOSE);
  // side 5 bottom
  texture(img5);
  textureMode(NORMAL);
  beginShape();
  vertex(verts[1].x*dispSz, verts[1].y*dispSz, verts[1].z*dispSz, 0, 0);
  vertex(verts[3].x*dispSz, verts[3].y*dispSz, verts[3].z*dispSz, 1, 0);
  vertex(verts[7].x*dispSz, verts[7].y*dispSz, verts[7].z*dispSz, 1, 1);
  vertex(verts[5].x*dispSz, verts[5].y*dispSz, verts[5].z*dispSz, 0, 1);
  endShape(CLOSE);
  // side 6 back
  texture(img6);
  textureMode(NORMAL);
  beginShape();
  vertex(verts[2].x*dispSz, verts[2].y*dispSz, verts[2].z*dispSz, 0, 0);
  vertex(verts[3].x*dispSz, verts[3].y*dispSz, verts[3].z*dispSz, 1, 0);
  vertex(verts[7].x*dispSz, verts[7].y*dispSz, verts[7].z*dispSz, 1, 1);
  vertex(verts[6].x*dispSz, verts[6].y*dispSz, verts[6].z*dispSz, 0, 1);
  endShape(CLOSE);

  
  // face = find_pentagon(line_arr[0], line_arr, face_line_arr);
  // face_arr = [];
  // if(face){
  //   // console.log(face);
  // }
}

function ch(){
  if(r_check.checked()){
    flag = true;
    // rotateX(rotation);
    // rotateY(rotation);
    // // rotateZ(rotation);
    // slider_x.value(rotation);
    // slider_y.value(rotation*2);
    // rotation += rotation_factor*200;
    // if(rotation > 180){
    //   rotation-=360;
    // }
  }
  else{
    flag = false;
    // rotateX(slider_x.value());
    // rotateY(slider_y.value());
  }
}

function windowResized(){
  resizeCanvas((windowWidth*widthF), (windowWidth*widthF));
  // canvas.width = windowWidth*widthF;
  // canvas.height = windowHeight.heightF;
  dispSz = ((windowWidth*widthF)*(windowWidth*widthF))*dispF
  // console.log('window width: '+ windowWidth + ', widthFactor: ' + widthF + ', combined: '+ (windowWidth*widthF));
  // console.log('canvas width: ' + canvas.width);

}
function find_last(line, line_arr, face_line_arr){
  for(var i = 0; i < line_arr.length; i++){
    if((line[1].x == line_arr[i][0].x) && (line[1].y == line_arr[i][0].y) && (line[1].z == line_arr[i][0].z)){
      if((face_line_arr[0][0].x == line_arr[i][1].x) && (face_line_arr[0][0].y == line_arr[i][1].y) && (face_line_arr[0][0].z == line_arr[i][1].z)){
        face_line_arr.push(line_arr[i]);
        return face_line_arr;
      }
    }
  }
}
var face_arr = [];
function find_pentagon(line, line_arr_orig, face_line_arr){
  console.log(face_line_arr.length)
  var line_arr = line_arr_orig;
  face_line_arr.push(line);
  if(face_line_arr.length == 5){
    console.log("STOP");
    face_arr = face_line_arr.slice(0);
    face_line_arr = [];
    console.log('length: '+face_arr.length);
    return face_arr;
  }
  else if(face_line_arr.length == 4){
    console.log('find last');
    return find_last(line, line_arr, face_line_arr);
  }
  else if(face_line_arr.length > 5){
    return 'error'
  }
  var io = line_arr.indexOf(line);
  line_arr.splice(io, 1);
  for(var i = 0; i < line_arr.length; i++){
    // console.log(line);
    if((line[1].x == line_arr[i][0].x) && (line[1].y == line_arr[i][0].y) && (line[1].z == line_arr[i][0].z)){
      // console.log('current: '+line[0]+', next: '+line_arr[i][0]);
      if(!face_line_arr.includes(line_arr[i])){
        // face_line_arr = find_pentagon(line_arr[i], line_arr, face_line_arr);
        console.log('return on next line');
        // return face_line_arr;
        return find_pentagon(line_arr[i], line_arr, face_line_arr);
      }
    }
  }
}

// instead of actually drawing the dodecahedron with lines use beginShape(); vertex(x,y,z); endShape(CLOSE); (using close will put line between last and first point)
// iterate through all of the possible shape points, if they are a line add them to the shape array, if not pass.
// if the next line is connected to the previous lines end, add it. else pass
// once you have 5 point triplets close the shape
// 
// once you have 12 shapes, stop
// 
// 
// before adding shapes to array, iterate over array and compare ordered lists of vertexes to see if shape already exists (same side from different starting vertexes)
// 
