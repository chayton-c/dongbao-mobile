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
  { path: 'vip-level-upgrade-card', loadChildren: () => import('./view/vip-level-upgrade-card/vip-level-upgrade-card.module').then(m => m.VipLevelUpgradeCardModule) },
  { path: 'friends-help/activities', loadChildren: () => import('./view/friend-help/activities/activities.module').then(m => m.ActivitiesModule) },
  { path: 'friends-help/activity-info', loadChildren: () => import('./view/friend-help/activity-info/activity-info.module').then(m => m.ActivityInfoModule) },
  { path: 'friends-help/coupon', loadChildren: () => import('./view/friend-help/coupon/coupon.module').then(m => m.CouponModule) },
  { path: 'friends-help/orders', loadChildren: () => import('./view/friend-help/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'friends-help/purchase', loadChildren: () => import('./view/friend-help/purchase/purchase.module').then(m => m.PurchaseModule) },
  { path: 'friends-help/eleme-activity', loadChildren: () => import('./view/friend-help/eleme-activity/eleme-activity.module').then(m => m.ElemeActivityModule) },
  { path: 'order-retrieval', loadChildren: () => import('./view/order-retrieval/order-retrieval.module').then(m => m.OrderRetrievalModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
