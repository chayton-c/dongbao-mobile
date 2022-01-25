import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActionSheetService, ModalService, ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {HttpUtils} from "../../util/http/http-util";
import {Goods} from "../../pojo/goods/goods";
import { Platform } from '@angular/cdk/platform';


@Component({
  selector: 'app-taobao-goods',
  templateUrl: './taobao-goods.component.html',
  styleUrls: ['./taobao-goods.component.less']
})
export class TaobaoGoodsComponent implements OnInit {

  encryptCustomerId: string = "";
  title: string = "";
  shopName: string = "";
  goodsId: string = "";
  goods: Goods = {

  };
  copied = false;

  constructor(
    private _modal: ModalService,
    private _actionSheet: ActionSheetService,
    private http: HttpClient,
    private _toast: ToastService,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    public router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.encryptCustomerId) this.encryptCustomerId = queryParams.encryptCustomerId;
      if (queryParams.title) this.title = queryParams.title;
      if (queryParams.shopName) this.shopName = queryParams.shopName;
      if (queryParams.goodsId) this.goodsId = queryParams.goodsId;
    });

    let params = {
      title: this.title,
      shopName: this.shopName,
      encryptCustomerId: this.encryptCustomerId,
      goodsId: this.goodsId,
      platform: 2
    }

    this.http.post('/api/mobile/goods/taobaoGoodsInfo', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      this.goods = res.goods;
      this.cdr.detectChanges();
    });
  }

  copyInputMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
    setTimeout(() => this.copied = false, 5000)
  }

  jump2AuthPage() {
    window.location.href = "http://server.bogufangzhou.com/auth/wechat-auth";
  }


}
