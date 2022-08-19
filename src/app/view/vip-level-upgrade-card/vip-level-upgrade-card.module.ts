import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VipLevelUpgradeCardRoutingModule } from './vip-level-upgrade-card-routing.module';
import { VipLevelUpgradeCardComponent } from './vip-level-upgrade-card.component';
import {FormsModule} from "@angular/forms";
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";


@NgModule({
  declarations: [
    VipLevelUpgradeCardComponent
  ],
  imports: [
    CommonModule,
    VipLevelUpgradeCardRoutingModule,
    FormsModule,
    NgZorroAntdMobileModule
  ]
})
export class VipLevelUpgradeCardModule { }
