import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MapRoutingModule} from './map-routing.module';
import {MapScreenComponent} from './map.screen.component/map.screen.component';
import {LibraryModule} from 'app/library/library.module';
import {CategoriesComponent} from './categories.component/categories.component';
import {EventDescriptionComponent} from './event-description.component/event-description.component';
import {IconSpriteModule} from 'ng-svg-icon-sprite';
import {PlaceDescriptionComponent} from './place-description.component/place-description.component';

@NgModule({
  declarations: [
    MapScreenComponent,
    CategoriesComponent,
    EventDescriptionComponent,
    PlaceDescriptionComponent
  ],
  imports: [
    BrowserModule,
    MapRoutingModule,
    LibraryModule,
    IconSpriteModule
  ],
  providers: []
})
export class MapModule {
}
