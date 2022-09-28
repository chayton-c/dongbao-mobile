import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import {SharedModule} from "../../../shared/shared.module";
import {CheckboxModule} from "ng-zorro-antd-mobile";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    PurchaseComponent
  ],
    imports: [
        CommonModule,
        PurchaseRoutingModule,
        SharedModule,
        CheckboxModule,
        MatCheckboxModule,
        MatDialogModule
    ]
})
export class PurchaseModule { }
