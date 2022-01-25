import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActionSheetService, ModalService, ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {HttpUtils} from "../../../util/http/http-util";

@Component({
  selector: 'app-wechat-auth',
  templateUrl: './wechat-auth.component.html',
  styleUrls: ['./wechat-auth.component.less']
})
export class WechatAuthComponent implements OnInit {

  constructor(
    private _modal: ModalService,
    private _actionSheet: ActionSheetService,
    private http: HttpClient,
    private _toast: ToastService,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    public router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute) {
  }


  code?: string;
  encryptCustomerId?: string;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.code) this.code = queryParams.code;
      if (queryParams.encryptCustomerId) this.encryptCustomerId = queryParams.encryptCustomerId;
    });
    // if (!this.code) {
    //   window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf965489b2b9d401d&redirect_uri=http%3A%2F%2Fserver.bogufangzhou.com%2Fauth%2Fwechat-auth%3FencryptCustomerId%3DECEF5EC33432A9B37BC498F989CAD51D&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
    // }

    let params = {
      code: this.code,
      encryptCustomerId: this.encryptCustomerId
    }

    this.http.post('/api/app/mobile/wechat/wechatPlatform/getCustomerInfo', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
    });
  }

}
