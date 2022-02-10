import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActionSheetService, ModalService, ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {HttpUtils} from "../../util/http/http-util";
import {Customer} from "../../pojo/system/customer";

@Component({
  selector: 'app-wa',
  templateUrl: './wa.component.html',
  styleUrls: ['./wa.component.less']
})
export class WaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
  }


  code?: string;
  customerId?: string;
  appid: string = "wxf965489b2b9d401d";
  parent: Customer = {

  };

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.code) this.code = queryParams.code;
      if (queryParams.e) this.customerId = queryParams.e;
    });

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