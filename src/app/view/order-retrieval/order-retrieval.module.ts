import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRetrievalRoutingModule } from './order-retrieval-routing.module';
import { OrderRetrievalComponent } from './order-retrieval.component';
import {ImagePickerModule} from "ng-zorro-antd-mobile";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderRetrievalComponent
  ],
    imports: [
        CommonModule,
        OrderRetrievalRoutingModule,
        ImagePickerModule,
        FormsModule
    ]
})
export class OrderRetrievalModule { }
