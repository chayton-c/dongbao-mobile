import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaobaoTestRoutingModule } from './taobao-test-routing.module';
import { TaobaoTestComponent } from './taobao-test.component';
import {ButtonModule, ListModule, TextareaItemModule} from "ng-zorro-antd-mobile";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TaobaoTestComponent
  ],
  imports: [
    CommonModule,
    TaobaoTestRoutingModule,
    ListModule,
    TextareaItemModule,
    FormsModule,
    ButtonModule
  ]
})
export class TaobaoTestModule { }
