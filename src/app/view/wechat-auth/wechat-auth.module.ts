import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WechatAuthRoutingModule } from './wechat-auth-routing.module';
import { WechatAuthComponent } from './wechat-auth.component';


@NgModule({
  declarations: [
    WechatAuthComponent
  ],
  imports: [
    CommonModule,
    WechatAuthRoutingModule
  ]
})
export class WechatAuthModule { }
