import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRuAt from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BackendService} from 'app/services/backend.service';
import {IndexModule} from 'app/main/index.module/index.module';
import {HttpClientModule} from '@angular/common/http';

registerLocaleData(localeRuAt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    BackendService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
