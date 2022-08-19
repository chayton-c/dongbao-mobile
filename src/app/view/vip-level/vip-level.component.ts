import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";
import {Customer} from "../../pojo/system/customer";
import {CustomerVipLevel} from "../../pojo/system/customer-vip-level";
import {ActivityLinkConvertInfo} from "../../pojo/activity-link-convert-info";
import {VipLevelPageSettings} from "../../pojo/vip-level/vip-level-page-settings";
import {WebkitUtil} from "../../util/webkit-util";
import {CustomHtmlConstant} from "../../pojo/custom-html/custom-html";
import {CustomHtmlComponentConstant} from "../../pojo/custom-html/custom-html-component";
import {VipLevelUpgradePagePrivilegeButton} from "../../pojo/vip-level/vip-level-upgrade-page-privilege-button";

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
  vipLevelPageSettings?: VipLevelPageSettings;
  commissionGrowthRate: number = 1;
  level1VipPurchasePage: boolean = false;
  agentPurchasePage: boolean = false;
  math = Math;
  redeemCardNumber?: string;
  vipLevelUpgradePagePrivilegeButtons: VipLevelUpgradePagePrivilegeButton[] = [];

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
    document.body.style.backgroundColor = '#F8F8F8';
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
        return;
      }
      this.customer = res.customer;
      this.customerVipLevel = res.customerVipLevel;
      this.vipLevelUpgradeCardPayment = res.vipLevelUpgradeCardPayment;
      this.vipLevelUpgradeVipPayment = res.vipLevelUpgradeVipPayment;
      this.commissionGrowthRate = res.commissionGrowthRate;
      this.vipLevelPageSettings = res.vipLevelPageSettings;
      this.vipLevelUpgradePagePrivilegeButtons = res.vipLevelUpgradePagePrivilegeButtons;
    });
  }

  redeemCard(): void {
    if (!this.redeemCardNumber) return;

    // this.loading = true;
    let params = {
      customerId: this.customerId,
      cardNo: this.redeemCardNumber
    }

    this.http.post('/api/mobile/vipLevel/useCard', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail(res.msg);
        return;
      }
      this.redeemCardNumber = '';
      this._toast.success('兑换成功');
      this.loadDataFromServer();
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

  jump2CardPage() {
    if (!this.customer.agentType) {
      this._toast.success("尚未开通代理权限");
      return;
    }

    if (this.android) {
      this.router.navigate(['/vip-level-upgrade-card'], {
        queryParams: {
          customerId: this.customerId,
          vipLevelId: this.vipLevelId,
          android: this.android,
          ios: this.ios
        },
      });
    } else {
      let redirectUrl = window.location.protocol + "//" + window.location.host + "/vip-level-upgrade-card?ios=1&vipLevelId=" + this.vipLevelId + "&customerId=" + this.customerId;
      console.log(redirectUrl)
      let activityLinkConvertInfo: ActivityLinkConvertInfo = {
        shareBasePictureUrl: "", url: redirectUrl, wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
        text: "", copyBeforeAction: "", title: ""
      }
      let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";
      // @ts-ignore
      window.webkit.messageHandlers.redirectToUrl.postMessage(s);
    }


    return;
  }

  jump2Cardpurchase() {
    if (!this.customer.agentType) {
      this._toast.success("尚未开通代理权限");
      return;
    }

    WebkitUtil.postMessage(new CustomHtmlComponentConstant().ELEME_CONVERT, this.vipLevelUpgradeCardPayment, this.android);
  }

  jump2VipPayment() {
    WebkitUtil.postMessage(new CustomHtmlComponentConstant().ELEME_CONVERT, this.vipLevelUpgradeVipPayment, this.android);
  }

  jump2CustomHtml(url: any) {
    if (!this.customer.level1Vip && !this.customer.agentType) {
      this._toast.success("尚未开通超级会员权限");
      return;
    }

    WebkitUtil.postMessage(
      new CustomHtmlComponentConstant().NAVIGATE_TO_OHTER_PAGE, this.vipLevelUpgradeCardPayment, this.android, {
        router: this.router,
        redirectUrl: url,
        customerId: this.customerId
      }
    );
  }
}
