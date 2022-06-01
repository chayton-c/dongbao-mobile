import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../pojo/system/customer";
import {HttpUtils} from "../../util/http/http-util";

@Component({
  selector: 'app-wechat-auth',
  templateUrl: './wechat-auth.component.html',
  styleUrls: ['./wechat-auth.component.less']
})
export class WechatAuthComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
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
    if (!this.code) {
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

}
