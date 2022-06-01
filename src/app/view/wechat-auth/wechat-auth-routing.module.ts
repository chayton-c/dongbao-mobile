import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WechatAuthComponent } from './wechat-auth.component';

const routes: Routes = [{ path: '', component: WechatAuthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WechatAuthRoutingModule { }
