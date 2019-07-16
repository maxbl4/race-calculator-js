import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackViewComponent } from './track-view/track-view.component';
import {TrackService} from "./services/track.service";
import {FormsModule} from "@angular/forms";
import {DataService} from "./services/data.service";

@NgModule({
  declarations: [
    AppComponent,
    TrackViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TrackService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
