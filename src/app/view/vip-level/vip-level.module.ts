import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VipLevelRoutingModule } from './vip-level-routing.module';
import { VipLevelComponent } from './vip-level.component';
import {CardModule} from "ng-zorro-antd-mobile";


@NgModule({
  declarations: [
    VipLevelComponent
  ],
  imports: [
    CommonModule,
    VipLevelRoutingModule,
    CardModule
  ]
})
export class VipLevelModule { }
