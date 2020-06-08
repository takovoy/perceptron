import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AdminPageContainerComponent} from './components/admin-page-container.component/admin-page-container.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminPageContainerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AdminPageContainerComponent,
  ]
})
export class LibraryModule {}
