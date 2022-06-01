import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaobaoGoodsComponent } from './taobao-goods.component';

const routes: Routes = [{ path: '', component: TaobaoGoodsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaobaoGoodsRoutingModule { }
