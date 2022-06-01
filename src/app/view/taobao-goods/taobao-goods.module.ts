import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaobaoGoodsRoutingModule } from './taobao-goods-routing.module';
import { TaobaoGoodsComponent } from './taobao-goods.component';
import {CarouselModule, WingBlankModule} from "ng-zorro-antd-mobile";


@NgModule({
  declarations: [
    TaobaoGoodsComponent
  ],
  imports: [
    CommonModule,
    TaobaoGoodsRoutingModule,
    CarouselModule,
    WingBlankModule
  ]
})
export class TaobaoGoodsModule { }
