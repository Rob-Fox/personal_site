import { analyzeAndValidateNgModules } from "@angular/compiler";
import { createInjectableDefinitionMap } from "@angular/compiler/src/render3/partial/injectable";
import { Component, ɵɵstylePropInterpolate5 } from "@angular/core";
import * as p5 from 'p5';
// const p5 = require('p5')
@Component({
    selector: 'app-image-display',
    templateUrl: './image-display.component.html'
})
export class ImageDisplayComponent{
    // private p5;
    ngOnInit(){
        new p5(p => {
            let x = 700;
            let y = 450;
            let dispSz: any;
            
            class vert{
                x:any;
                y:any;
                z:any;
                constructor(x: any,y: any,z: any){
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
            }
            function addVerts(x: any,y: any,z: any){
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
            var verts: any;
            verts = [];
            var rotation_factor = 0.004;
            var rotation = 0.001;
            var widthF = .7;
            var heightF = .9;
            var dispF = .00015;
            function addPermutations(x: any,y: any,z: any){
              addVerts(x,y,z);
              addVerts(z,x,y);
              addVerts(y,z,x);
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
                p.resizeCanvas((p.windowWidth*widthF), (p.windowWidth*widthF));
                dispSz = ((p.windowWidth*widthF)*(p.windowWidth*widthF))*dispF
                
            }
            let img1:any, img2:any, img3:any, img4:any, img5:any, img6:any, slider_x:any, slider_y:any, r_check:any;
            p.preload = () => {
                img1 = p.loadImage('assets/images/photos.jpg');
                img2 = p.loadImage('assets/images/photos1.jpg');
                img3 = p.loadImage('assets/images/photos2.jpg');
                img4 = p.loadImage('assets/images/photos3.jpg');
                img5 = p.loadImage('assets/images/photos4.jpg');
                img6 = p.loadImage('assets/images/photos5.jpg');
              }

            p.setup = () => {
                p.clear();
                p.angleMode(p.DEGREES);
                var canvas = p.createCanvas(700, 450, p.WEBGL);
                p.resizeCanvas(p.windowWidth*widthF, p.windowWidth*widthF);
                var PHI = (1+Math.sqrt(5))/2;
                addVerts(1,1,1);
                // addPermutations(0,1/PHI,PHI);
                let edgeLength = 2/PHI;
                dispSz = 90;
                dispSz = ((p.windowWidth*widthF)*p.windowHeight*heightF)*dispF
                slider_x = p.createSlider(-180, 180, 0);
                slider_y = p.createSlider(-180, 180, 0);
                r_check = p.createCheckbox('auto rotate', true);
                r_check.changed(ch);
                let cv:any;
                cv = document.getElementById('main');
                cv.appendChild(slider_x.elt);
                cv.appendChild(slider_y.elt);
                cv.appendChild(r_check.elt);
            };
            let flag = true;
            p.draw = () => {
                p.background(255,255,255,0);
                // background(255);
                if(flag){
                    p.rotateX(rotation);
                    p.rotateY(rotation);
                    slider_x.value(rotation);
                    slider_y.value(rotation);
                    rotation += rotation_factor*200;
                    if(rotation > 180){
                    rotation-=360;
                    }
                }
                else{
                    p.rotateX(slider_x.value());
                    p.rotateY(slider_y.value());
                }

                // side 1 top
                p.texture(img1);
                p.textureMode(p.NORMAL);
                p.beginShape();
                p.vertex(verts[0].x*dispSz, verts[0].y*dispSz, verts[0].z*dispSz, 0, 0);
                p.vertex(verts[2].x*dispSz, verts[2].y*dispSz, verts[2].z*dispSz, 1, 0);
                p.vertex(verts[6].x*dispSz, verts[6].y*dispSz, verts[6].z*dispSz, 1, 1);
                p.vertex(verts[4].x*dispSz, verts[4].y*dispSz, verts[4].z*dispSz, 0, 1);
                p.endShape(p.CLOSE);
                // side 2 front
                p.texture(img2);
                p.textureMode(p.NORMAL);
                p.beginShape();
                p.vertex(verts[0].x*dispSz, verts[0].y*dispSz, verts[0].z*dispSz, 0, 0);
                p.vertex(verts[1].x*dispSz, verts[1].y*dispSz, verts[1].z*dispSz, 1, 0);
                p.vertex(verts[5].x*dispSz, verts[5].y*dispSz, verts[5].z*dispSz, 1, 1);
                p.vertex(verts[4].x*dispSz, verts[4].y*dispSz, verts[4].z*dispSz, 0, 1);
                p.endShape(p.CLOSE);
                // side 3 left
                p.texture(img3);
                p.textureMode(p.NORMAL);
                p.beginShape();
                p.vertex(verts[0].x*dispSz, verts[0].y*dispSz, verts[0].z*dispSz, 0, 0);
                p.vertex(verts[1].x*dispSz, verts[1].y*dispSz, verts[1].z*dispSz, 1, 0);
                p.vertex(verts[3].x*dispSz, verts[3].y*dispSz, verts[3].z*dispSz, 1, 1);
                p.vertex(verts[2].x*dispSz, verts[2].y*dispSz, verts[2].z*dispSz, 0, 1);
                p.endShape(p.CLOSE);
                // side 4 right
                p.texture(img4);
                p.textureMode(p.NORMAL);
                p.beginShape();
                p.vertex(verts[4].x*dispSz, verts[4].y*dispSz, verts[4].z*dispSz, 0, 0);
                p.vertex(verts[5].x*dispSz, verts[5].y*dispSz, verts[5].z*dispSz, 1, 0);
                p.vertex(verts[7].x*dispSz, verts[7].y*dispSz, verts[7].z*dispSz, 1, 1);
                p.vertex(verts[6].x*dispSz, verts[6].y*dispSz, verts[6].z*dispSz, 0, 1);
                p.endShape(p.CLOSE);
                // side 5 bottom
                p.texture(img5);
                p.textureMode(p.NORMAL);
                p.beginShape();
                p.vertex(verts[1].x*dispSz, verts[1].y*dispSz, verts[1].z*dispSz, 0, 0);
                p.vertex(verts[3].x*dispSz, verts[3].y*dispSz, verts[3].z*dispSz, 1, 0);
                p.vertex(verts[7].x*dispSz, verts[7].y*dispSz, verts[7].z*dispSz, 1, 1);
                p.vertex(verts[5].x*dispSz, verts[5].y*dispSz, verts[5].z*dispSz, 0, 1);
                p.endShape(p.CLOSE);
                // side 6 back
                p.texture(img6);
                p.textureMode(p.NORMAL);
                p.beginShape();
                p.vertex(verts[2].x*dispSz, verts[2].y*dispSz, verts[2].z*dispSz, 0, 0);
                p.vertex(verts[3].x*dispSz, verts[3].y*dispSz, verts[3].z*dispSz, 1, 0);
                p.vertex(verts[7].x*dispSz, verts[7].y*dispSz, verts[7].z*dispSz, 1, 1);
                p.vertex(verts[6].x*dispSz, verts[6].y*dispSz, verts[6].z*dispSz, 0, 1);
                p.endShape(p.CLOSE);
            }
        })
    }
}