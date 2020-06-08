import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {IndexRoutingModule} from './index-routing.module';
import {LibraryModule} from 'app/library/library.module';
import {IndexScreenComponent} from './index.screen.component/index.screen.component';
import {BackendService} from 'app/services/backend.service';

@NgModule({
  declarations: [
    IndexScreenComponent
  ],
  imports: [
    BrowserModule,
    IndexRoutingModule,
    LibraryModule,
  ],
  providers: []
})
export class IndexModule {
}
