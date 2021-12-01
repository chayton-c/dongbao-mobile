import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoldCoinsReceiveComponent} from "./view/system-activities/gold-coins-receive/gold-coins-receive.component";
import {WechatAuthComponent} from "./view/auth/wechat-auth/wechat-auth.component";
import {TestComponent} from "./view/test/test.component";
import {GoldCoinsWithdrawalComponent} from "./view/system-activities/gold-coins-withdrawal/gold-coins-withdrawal.component";
import {GoldCoinsWithdrawalDetailComponent} from "./view/system-activities/gold-coins-withdrawal-detail/gold-coins-withdrawal-detail.component";
import {ActivitiesDomainComponent} from "./view/system-activities/activities-domain/activities-domain.component";

const routes: Routes = [
  { path: 'system-activities/activities-domain', component: ActivitiesDomainComponent },
  { path: 'system-activities/gold-coins-receive', component: GoldCoinsReceiveComponent },
  { path: 'system-activities/gold-coins-withdrawal', component: GoldCoinsWithdrawalComponent },
  { path: 'system-activities/gold-coins-withdrawal-detail', component: GoldCoinsWithdrawalDetailComponent },
  { path: 'auth/wechat-auth', component: WechatAuthComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
