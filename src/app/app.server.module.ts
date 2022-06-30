import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {TestComponent} from "./view/test/test.component";
import {CustomHtmlConstant} from "./pojo/custom-html/custom-html";
import {CustomHtmlPageComponent} from "./view/custom-html-page/custom-html-page.component";
import {CustomHtmlPageRoutingModule} from "./view/custom-html-page/custom-html-page-routing.module";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

// const routes: Routes = [
//   { path: 'test', component: TestComponent },
//   { path: 'tutorial', loadChildren: () => import('./view/tutorials/tutorials.module').then(m => m.TutorialsModule) },
//   { path: 'wa', loadChildren: () => import('./view/wechat-auth/wechat-auth.module').then(m => m.WechatAuthModule) },
//   { path: 'taobao-goods', loadChildren: () => import('./view/taobao-goods/taobao-goods.module').then(m => m.TaobaoGoodsModule) },
//   { path: 'taobao-test', loadChildren: () => import('./view/taobao-test/taobao-test.module').then(m => m.TaobaoTestModule) },
//   { path: 'normal-questions', loadChildren: () => import('./view/normal-questions/normal-questions.module').then(m => m.NormalQuestionsModule) },
//   { path: 'multiple-button-activity', loadChildren: () => import('./view/custom-html-page/custom-html-page.module').then(m => m.CustomHtmlPageModule) },
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes, {
//     initialNavigation: 'enabled'
//   })],
//   exports: [RouterModule]
// })
//
// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       initialNavigation: 'enabled'
//     }),
//     ServerModule,
//   ],
//   exports: [RouterModule],
//   bootstrap: [AppComponent],
// })
// export class AppServerModule {}
