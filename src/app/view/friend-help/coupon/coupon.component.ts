import { Component, OnInit } from '@angular/core';
import {HttpUtils} from "../../../util/http/http-util";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {FriendsHelpGoodsCoupon} from "../../../pojo/friends-help/friends-help-goods-coupon";
import {WebkitUtil} from "../../../util/webkit-util";

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.less']
})
export class CouponComponent implements OnInit {

  customerId: string;
  android: number;
  friendsHelpGoodsCoupons: FriendsHelpGoodsCoupon[] = [];


  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private platform: Platform,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#FEFDFE';
    this.titleService.setTitle("我的话费券");

    this.customerId = "";
    this.android = 0;
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.android) this.android = queryParams.android;
    });
  }

  ngOnInit(): void {
    let detailParams = {
      customerId: this.customerId,
    }

    // 加载上级
    this.http.post('/api/mobile/friendsHelp/friendsHelpGoodsCoupon/init', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
      }
      this.friendsHelpGoodsCoupons = res.friendsHelpGoodsCoupons;
    });
  }

  jump2Purchase():void {
    let redirectUrl = window.location.origin + "/friends-help/purchase?customerId="
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
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "充值中心"
    });
  }
}
