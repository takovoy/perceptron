import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapScreenComponent} from './map.screen.component/map.screen.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
