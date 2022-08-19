import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VipLevelRoutingModule } from './vip-level-routing.module';
import { VipLevelComponent } from './vip-level.component';
import {CardModule, NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    VipLevelComponent
  ],
  imports: [
    CommonModule,
    VipLevelRoutingModule,
    CardModule,
    NgZorroAntdMobileModule,
    FormsModule,
  ]
})
export class VipLevelModule { }
