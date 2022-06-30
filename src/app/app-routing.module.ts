import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./view/test/test.component";

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'tutorial', loadChildren: () => import('./view/tutorials/tutorials.module').then(m => m.TutorialsModule) },
  { path: 'wa', loadChildren: () => import('./view/wechat-auth/wechat-auth.module').then(m => m.WechatAuthModule) },
  { path: 'taobao-goods', loadChildren: () => import('./view/taobao-goods/taobao-goods.module').then(m => m.TaobaoGoodsModule) },
  { path: 'taobao-test', loadChildren: () => import('./view/taobao-test/taobao-test.module').then(m => m.TaobaoTestModule) },
  { path: 'normal-questions', loadChildren: () => import('./view/normal-questions/normal-questions.module').then(m => m.NormalQuestionsModule) },
  { path: 'multiple-button-activity', loadChildren: () => import('./view/custom-html-page/custom-html-page.module').then(m => m.CustomHtmlPageModule) },
  { path: 'vip-level', loadChildren: () => import('./view/vip-level/vip-level.module').then(m => m.VipLevelModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
