import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";
import {Customer} from "../../pojo/system/customer";
import {CustomerVipLevel} from "../../pojo/system/customer-vip-level";
import {ActivityLinkConvertInfo} from "../../pojo/activity-link-convert-info";

@Component({
  selector: 'app-vip-level',
  templateUrl: './vip-level.component.html',
  styleUrls: ['./vip-level.component.less']
})
export class VipLevelComponent implements OnInit {

  customerId: string = "";
  android: number = 0;
  ios: number = 0;
  vipLevelId: string = "";
  vipLevelUpgradeCardPayment?: ActivityLinkConvertInfo;
  vipLevelUpgradeVipPayment?: ActivityLinkConvertInfo;
  commissionGrowthRate: number = 1;
  level1VipPurchasePage: boolean = false;
  agentPurchasePage: boolean = false;
  math = Math;

  customer: Customer = {

  }
  customerVipLevel: CustomerVipLevel = {
    customerId: "", id: ""
  }

  constructor(
    private _toast: ToastService,
    private http: HttpClient,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.vipLevelId) this.vipLevelId = queryParams.vipLevelId;
      if (queryParams.android) this.android = queryParams.android;
      if (queryParams.ios) this.ios = queryParams.ios;

      this.level1VipPurchasePage = this.vipLevelId == '1';
      this.agentPurchasePage = this.vipLevelId == '2';

      this.loadDataFromServer();
    });
  }

  ngOnInit(): void {
    document.body.style.backgroundColor = '#EDEFFB';
  }

  loadDataFromServer(): void {
    // this.loading = true;
    let params = {
      customerId: this.customerId,
      vipLevelId: this.vipLevelId
    }

    this.http.post('/api/mobile/vipLevel/infoPage', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
      }
      this.customer = res.customer;
      this.customerVipLevel = res.customerVipLevel;
      this.vipLevelUpgradeCardPayment = res.vipLevelUpgradeCardPayment;
      this.vipLevelUpgradeVipPayment = res.vipLevelUpgradeVipPayment;
      this.commissionGrowthRate = res.commissionGrowthRate;
    });
  }

  backPreviousPage(): void {
    if (this.android) {
      // @ts-ignore
      window.Android.backPreviousPage('');
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.backPreviousPage.postMessage('');
    }
    return;
  }

  jump2GoldcoinsActivityFrontpage(): void {
    if (this.android) {
      // @ts-ignore
      window.Android.jump2GoldcoinsActivityFrontpage('');
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.jump2GoldcoinsActivityFrontpage.postMessage('');
    }
    return;
  }

  jump2CardPayment() {
    let s = this.vipLevelUpgradeCardPayment;
    let content = JSON.stringify(s);
    console.log(content);
    if (this.android) {
      // @ts-ignore
      window.Android.elemeScheme(content);
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.elemeScheme.postMessage(content);
    }
    return;
  }

  jump2VipPayment() {
    let s = this.vipLevelUpgradeVipPayment;
    let content = JSON.stringify(s);
    console.log(content);
    if (this.android) {
      // @ts-ignore
      window.Android.elemeScheme(content);
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.elemeScheme.postMessage(content);
    }
    return;
  }
}
