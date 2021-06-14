
// var verts = [];
// var rotation_factor = 0.004;
// var rotation = 0.001;
// var widthF = .7;
// var heightF = .9;
// var dispF = .00015;
// function addPermutations(x,y,z){
//   addVerts(x,y,z);
//   addVerts(z,x,y);
//   addVerts(y,z,x);
// }
// let img1, img2, img3, img4, img5, img6, slider_x, slider_y, r_check;
// function preload(){
//   img1 = loadImage(static_url+'main_page/photos.jpg');
//   img2 = loadImage(static_url+'main_page/photos1.jpg');
//   img3 = loadImage(static_url+'main_page/photos2.jpg');
//   img4 = loadImage(static_url+'main_page/photos3.jpg');
//   img5 = loadImage(static_url+'main_page/photos4.jpg');
//   img6 = loadImage(static_url+'main_page/photos5.jpg');
// }
// function setup() {
//   clear();
//   angleMode(DEGREES);
//   var canvas = createCanvas(700, 450, WEBGL);
//   resizeCanvas(windowWidth*widthF, windowWidth*widthF);
//   var PHI = (1+sqrt(5))/2;
//   addVerts(1,1,1);
//   // addPermutations(0,1/PHI,PHI);
//   edgeLength = 2/PHI;
//   dispSz = 90;
//   dispSz = ((windowWidth*widthF)*windowHeight*heightF)*dispF
//   slider_x = createSlider(-180, 180, 0);
//   slider_y = createSlider(-180, 180, 0);
//   r_check = createCheckbox('auto rotate', true);
//   r_check.changed(ch);
//   var cv = document.getElementById('main');
//   cv.appendChild(slider_x.elt);
//   cv.appendChild(slider_y.elt);
//   cv.appendChild(r_check.elt);
// }
// class vert{
//   constructor(x,y,z){
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }
// }
// function addVerts(x,y,z){
//   verts.push(new vert(x,y,z));
//   if(z != 0.0){verts.push(new vert(x,y,z*-1))}
//   if(y != 0.0){
//     verts.push(new vert(x,y*-1,z));
//     if(z != 0.0){verts.push(new vert(x,y*-1,z*-1))}
//   }
//   if(x != 0.0){
//     verts.push(new vert(x*-1,y,z));
//     if(z != 0.0){verts.push(new vert(x*-1,y,z*-1))}
//     if(y != 0.0){
//       verts.push(new vert(x*-1,y*-1,z));
//       if(z != 0.0){verts.push(new vert(x*-1,y*-1,z*-1))}
//     }
//   }
// }
let flag = true;
function draw() {
  background(255,255,255,0);
  // background(255);
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
}

function ch(){
  if(r_check.checked()){
    flag = true;
  }
  else{
    flag = false;
  }
}

function windowResized(){
  resizeCanvas((windowWidth*widthF), (windowWidth*widthF));
  dispSz = ((windowWidth*widthF)*(windowWidth*widthF))*dispF

}