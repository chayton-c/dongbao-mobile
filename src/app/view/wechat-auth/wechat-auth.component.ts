import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../pojo/system/customer";
import {HttpUtils} from "../../util/http/http-util";
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'app-wechat-auth',
  templateUrl: './wechat-auth.component.html',
  styleUrls: ['./wechat-auth.component.less']
})
export class WechatAuthComponent implements OnInit {

  showShadow = false;

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private platform: Platform,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#EC1E2C';
  }


  code?: string;
  customerId?: string;
  appid?: string = "wx9df689926d70eabb";
  parent: Customer = {

  };

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.code) this.code = queryParams.code;
      if (queryParams.e) this.customerId = queryParams.e;
    });
    if (!this.code && this.isWechat()) {
      let rawUri = window.location.href;
      let encode = encodeURI(rawUri);

      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appid + "&redirect_uri=" + encode + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
      return;
    }

    let params = {
      code: this.code,
      customerId: this.customerId
    }

    this.http.post('/api/mobile/wechat/wechatPlatform/getCustomerInfo', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
      }
      this.parent = res.parent;
    });
  }

  jump2download(): void {

    // this.platform.IOS
    if (this.isWechat()) {
      this.showShadow = true;
      return;
    } else if (this.platform.IOS) {
      window.location.href = "https://apps.apple.com/cn/app/%E5%A4%96%E5%8D%96%E7%9C%81%E5%A4%9A%E5%A4%9A-%E7%A7%81%E5%9F%9F%E6%B5%81%E9%87%8F%E5%8F%98%E7%8E%B0%E7%A5%9E%E5%99%A8/id1606496332";
    } else if (this.platform.ANDROID) {
      window.location.href = "http://shenghenduooss.gohong.com/android/shengduoduo.apk";
    }

  }

  isWechat(): boolean {
    return navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1;
  }

}
