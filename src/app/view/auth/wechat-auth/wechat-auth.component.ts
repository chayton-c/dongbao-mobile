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
    let params = {
      code: this.code,
      encryptCustomerId: this.encryptCustomerId
    }

    this.http.post('/api/app/mobile/wechat/wechatPlatform/getCustomerInfo', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
    });
  }

}
