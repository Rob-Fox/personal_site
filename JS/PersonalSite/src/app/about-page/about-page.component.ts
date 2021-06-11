import { Component } from "@angular/core";
@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html'
})
export class AboutPageComponent{
    about = "This site was made using a full JavaScript stack (MongoDB, ExpressJS, and NodeJS) with the Angular framework. On the right is a stock tracker that uses the yahoo finance api to get updated stock data when the page is loaded and updates asynchronously every 5 minutes by using websockets to request new data from the server.  Below is a viewport which renders an animated cube using p5js and images of photos I have taken are set as the texture of the faces and displayed."

}