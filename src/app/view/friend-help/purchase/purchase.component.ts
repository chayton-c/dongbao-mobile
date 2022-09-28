import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../../util/http/http-util";
import {FriendsHelpGoods} from "../../../pojo/friends-help/friends-help-goods";
import {WebkitUtil} from "../../../util/webkit-util";
import {FriendsHelpGoodsCoupon} from "../../../pojo/friends-help/friends-help-goods-coupon";
import {MatDialog} from "@angular/material/dialog";
import {CustomDialogComponent} from "../../../shared/components/custom-dialog-component/custom-dialog-component";
import {MsgUtil} from "../../../util/msg-util";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less']
})
export class PurchaseComponent implements OnInit {

  customerId: string; // 登录用户
  id: string;
  android: number = 0;
  goodsList: FriendsHelpGoods[] = [];
  purchaseModel = false;
  selectGoods: FriendsHelpGoods = {
    actualPrice: 0, description: "", goodsType: 0, hide: 0, id: "", imageUrl: "", price: 0, rule: "", seq: 0, stock: 0, title: ""
  }
  orderTel?: number;
  confirmRules = false;
  bestCoupon?: FriendsHelpGoodsCoupon; // 使用的优惠券面额最大的一张

  constructor(
    private http: HttpClient,
    private platform: Platform,
    public dialog: MatDialog,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = "#FEFDFE";
    this.titleService.setTitle("充值中心");

    this.customerId = "";
    this.id = "";
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.friendsHelpActivityId) this.id = queryParams.friendsHelpActivityId;
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.android) this.android = queryParams.android;
    });
  }

  ngOnInit(): void {
    let detailParams = {
      customerId: this.customerId,
    }

    // 加载上级
    this.http.post('/api/mobile/friendsHelp/friendsHelpGoods/init', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      this.goodsList = res.goodsList;
      for (let friendsHelpGood of this.goodsList) {
        let coupon = friendsHelpGood.friendsHelpGoodsCoupon;
        if (coupon) {
          if (!this.bestCoupon)
            this.bestCoupon = coupon;

          if (this.bestCoupon.amount < coupon.amount)
            this.bestCoupon = coupon;
        }
      }

    });
  }

  checkTel(event: InputEvent): void {
    if (this.orderTel && this.orderTel > 100000000000) {
      console.log(81)
      event.stopImmediatePropagation();
    }
  }

  initPurchaseModel(goods: FriendsHelpGoods): void {
    if (goods.stock <= 0) {
      MsgUtil.showErrorMsg(this.dialog, "商品已售罄");
      return;
    }

    if (!this.orderTel) {
      MsgUtil.showErrorMsg(this.dialog, "请输入手机号");
      return;
    }

    this.selectGoods = goods;
    this.purchaseModel = true;
    console.log(this.purchaseModel);
  }

  paying = false;
  payment(): void {
    if (!this.confirmRules) {
      MsgUtil.showErrorMsg(this.dialog, "尚未勾选充值须知，同意并勾选后再支付。");
      return;
    }
    this.paying = true;

    let detailParams = {
      customerId: this.customerId,
      friendsHelpGoodsId: this.selectGoods!.id,
      couponId: this.selectGoods!.friendsHelpGoodsCoupon?.id,
      orderTel: this.orderTel
    }

    this.http.post('/api/mobile/friendsHelp/friendsHelpGoodsOrder/createOrder', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        this.paying = false;
        return;
      }
      WebkitUtil.wechatPayment(res.paymentParams, this.android);
      this.paying = false;
    });
  }

  jump2Coupon(): void {
    let redirectUrl = window.location.origin + "/friends-help/coupon?customerId="
      + this.customerId + "&android=" + this.android;

    WebkitUtil.postMessage(WebkitUtil.CREATE_URL, {
      copyBeforeAction: "",
      shareBasePictureUrl: "",
      text: "",
      title: "",
      url: "",
      wxMiniprogramOriginalId: "",
      wxMiniprogramPath: "",
      wxMiniprogramQrcodeUrl: ""
    }, this.android, {
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "我的话费券"
    });
  }

  jump2ActivityInfo() {
    let redirectUrl = window.location.origin + "/friends-help/activity-info?customerId="
      + this.customerId + "&android=" + this.android + "&id=1";

    WebkitUtil.postMessage(WebkitUtil.CREATE_URL, {
      copyBeforeAction: "",
      shareBasePictureUrl: "",
      text: "",
      title: "",
      url: "",
      wxMiniprogramOriginalId: "",
      wxMiniprogramPath: "",
      wxMiniprogramQrcodeUrl: ""
    }, this.android, {
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "100元话费券免费领"
    });
  }

  jump2Order(): void {
    let redirectUrl = window.location.origin + "/friends-help/orders?customerId="
      + this.customerId + "&android=" + this.android;

    WebkitUtil.postMessage(WebkitUtil.CREATE_URL, {
      copyBeforeAction: "",
      shareBasePictureUrl: "",
      text: "",
      title: "",
      url: "",
      wxMiniprogramOriginalId: "",
      wxMiniprogramPath: "",
      wxMiniprogramQrcodeUrl: ""
    }, this.android, {
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "我的订单"
    });
  }

}
