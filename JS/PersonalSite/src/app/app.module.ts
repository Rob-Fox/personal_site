import { formatCurrency } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from "./about-page/about-page.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ImageDisplayComponent } from "./image-display/image-display.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { StockTickerComponent } from "./stock-ticker/stock-ticker.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    ContactFormComponent,
    ImageDisplayComponent,
    NavbarComponent,
    StockTickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
