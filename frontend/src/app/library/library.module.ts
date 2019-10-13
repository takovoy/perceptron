import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header.component/header.component';
import {BrowserModule} from '@angular/platform-browser';
import {IconSpriteModule} from 'ng-svg-icon-sprite';
import {RouterModule} from '@angular/router';
import {AdminMenuComponent} from './components/admin-menu.component/admin-menu.component';
import {AdminPageContainerComponent} from './components/admin-page-container.component/admin-page-container.component';
import {FieldComponent} from './components/field.component/field.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminMenuComponent,
    AdminPageContainerComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    IconSpriteModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    AdminMenuComponent,
    AdminPageContainerComponent,
    FieldComponent
  ]
})
export class LibraryModule {}
