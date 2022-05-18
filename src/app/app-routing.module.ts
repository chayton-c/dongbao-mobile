import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./view/test/test.component";
import {GoldCoinsWithdrawalComponent} from "./view/system-activities/gold-coins-withdrawal/gold-coins-withdrawal.component";
import {GoldCoinsWithdrawalDetailComponent} from "./view/system-activities/gold-coins-withdrawal-detail/gold-coins-withdrawal-detail.component";
import {ActivitiesDomainComponent} from "./view/system-activities/activities-domain/activities-domain.component";
import {TaobaoTestComponent} from "./view/taobao-test/taobao-test.component";
import {TaobaoGoodsComponent} from "./view/taobao-goods/taobao-goods.component";
import {TutorialComponent} from "./view/tutorial/tutorial.component";
import {TutorialDetailComponent} from "./view/tutorial-detail/tutorial-detail.component";
import {WaComponent} from "./view/wa/wa.component";
import {NormalQuestionsComponent} from "./view/normal-questions/normal-questions.component";
import {BaseActivityComponent} from "./view/base-activity/base-activity.component";
import {MultipleButtonActivityComponent} from "./view/multiple-button-activity/multiple-button-activity.component";

const routes: Routes = [
  { path: 'system-activities/activities-domain', component: ActivitiesDomainComponent },
  { path: 'system-activities/gold-coins-withdrawal', component: GoldCoinsWithdrawalComponent },
  { path: 'system-activities/gold-coins-withdrawal-detail', component: GoldCoinsWithdrawalDetailComponent },
  { path: 'wa', component: WaComponent },
  { path: 'test', component: TestComponent },
  { path: 'taobao-test', component: TaobaoTestComponent },
  { path: 'taobao-goods', component: TaobaoGoodsComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'tutorial-detail', component: TutorialDetailComponent },
  { path: 'normal-questions', component: NormalQuestionsComponent },
  { path: 'base-activity', component: BaseActivityComponent },
  { path: 'multiple-button-activity', component: MultipleButtonActivityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
