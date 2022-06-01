import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NormalQuestionsRoutingModule } from './normal-questions-routing.module';
import { NormalQuestionsComponent } from './normal-questions.component';
import {AccordionModule, ListModule} from "ng-zorro-antd-mobile";


@NgModule({
  declarations: [
    NormalQuestionsComponent
  ],
  imports: [
    CommonModule,
    NormalQuestionsRoutingModule,
    ListModule,
    AccordionModule
  ]
})
export class NormalQuestionsModule { }
