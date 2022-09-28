import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    CouponComponent
  ],
    imports: [
        CommonModule,
        CouponRoutingModule,
        SharedModule
    ]
})
export class CouponModule { }
