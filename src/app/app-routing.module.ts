import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoldCoinsReceiveComponent} from "./view/system-activities/gold-coins-receive/gold-coins-receive.component";
import {WechatAuthComponent} from "./view/auth/wechat-auth/wechat-auth.component";

const routes: Routes = [
  { path: 'system-activities/gold-coins-receive', component: GoldCoinsReceiveComponent },
  { path: 'auth/wechat-auth', component: WechatAuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
