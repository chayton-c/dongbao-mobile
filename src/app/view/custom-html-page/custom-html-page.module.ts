import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomHtmlPageRoutingModule } from './custom-html-page-routing.module';
import { CustomHtmlPageComponent } from './custom-html-page.component';


@NgModule({
  declarations: [
    CustomHtmlPageComponent
  ],
  imports: [
    CommonModule,
    CustomHtmlPageRoutingModule
  ]
})
export class CustomHtmlPageModule { }
