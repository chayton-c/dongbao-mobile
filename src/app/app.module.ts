import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { TestComponent } from './view/test/test.component';
import { TutorialComponent } from './view/tutorial/tutorial.component';
import {MatCardModule} from "@angular/material/card";
import { SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TutorialComponent,
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      AppRoutingModule,
      SharedModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpClientModule,
      NgZorroAntdMobileModule,
      MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
