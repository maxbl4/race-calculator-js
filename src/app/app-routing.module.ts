import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrackViewComponent} from "./track-view/track-view.component";


const routes: Routes = [
  {path: '**', component: TrackViewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
