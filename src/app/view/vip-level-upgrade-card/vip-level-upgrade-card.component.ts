import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {ModalService, PickerRef, PickerService, ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import { Location } from '@angular/common'
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";
import {VipLevelUpgradeCard} from "../../pojo/vip-level/vip-level-upgrade-card";
import {ActivityLinkConvertInfo} from "../../pojo/activity-link-convert-info";

@Component({
  selector: 'app-vip-level-upgrade-card',
  templateUrl: './vip-level-upgrade-card.component.html',
  styleUrls: ['./vip-level-upgrade-card.component.less']
})
export class VipLevelUpgradeCardComponent implements OnInit {

  android: number = 0;
  ios: number = 0;
  vipLevelId:string = '0';
  customerId: string = "";

  rawVipLevelUpgradeCards: VipLevelUpgradeCard[] = [];
  showCardDetail = false;
  cardUsedStatusFilter?: number;
  vipLevelIdFilter?: string;
  keywordFilter: string = "";
  filtedVipLevelUpgradeCards: VipLevelUpgradeCard[] = [];
  vipLevelUpgradeCardPayment: any;
  checkingVipLevelUpgradeCard: VipLevelUpgradeCard = {
    userInviteCode: "",
    addTime: new Date(),
    alreadyUsed: 0,
    cardNo: "",
    holderAvatar: "",
    holderCustomerId: "",
    holderName: "",
    holderTel: "",
    id: "",
    remark: "",
    restDays: 0,
    updateTime: new Date(),
    userAvatar: "",
    userCustomerId: "",
    userName: "",
    userTel: "",
    vipLevelId: ""

  }
  usedCount = 0;
  total = 0;
  unusedCount = 0;

  constructor(
    private _toast: ToastService,
    private http: HttpClient,
    private location: Location,
    private _picker: PickerService,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public modalService: ModalService,
    private activatedRoute: ActivatedRoute)
  {
    document.body.style.backgroundColor = '#F8F8F8';
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.android) this.android = queryParams.android;
      if (queryParams.ios) this.ios = queryParams.ios;
      if (queryParams.vipLevelId) this.vipLevelId = queryParams.vipLevelId;

      this.loadDataFromServer();
    });
  }

  showPicker() {
    const ref: PickerRef = this._picker.showPicker(
      { value: ['233'], data: ['全部', '代理', '超级会员'] },
      result => {
        console.log(result);
        if (result[0] == '全部') {
          this.vipLevelIdFilter = undefined;
          this.filterVipLevelUpgradeCards();
        }
        if (result[0] == '超级会员') {
          this.vipLevelIdFilter = '1';
          this.filterVipLevelUpgradeCards();
        }
        if (result[0] == '代理') {
          this.vipLevelIdFilter = '2';
          this.filterVipLevelUpgradeCards();
        }

      },
      cancel => {
        console.log('cancel');
      }
    );
  }

  ngOnInit(): void {
    document.body.style.backgroundColor = '#F8F8F8';
  }

  backPreviousPage(): void {
    if (this.android)
      this.location.back();
    else {
      // @ts-ignore
      window.webkit.messageHandlers.backPreviousPage.postMessage('');
      // let redirectUrl = window.location.protocol + "//" + window.location.host + "/vip-level?ios=1&vipLevelId=" + this.vipLevelId + "&customerId=" + this.customerId;
      // console.log(redirectUrl)
      // let activityLinkConvertInfo: ActivityLinkConvertInfo = {
      //   shareBasePictureUrl: "", url: redirectUrl, wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
      //   text: "", copyBeforeAction: "", title: ""
      // }
      // let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";
      // // @ts-ignore
      // window.webkit.messageHandlers.redirectToUrl.postMessage(s);
    }

    return;
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event:any) {
    console.log(event);
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    console.log(pos);
    console.log(max);
  }

  kaga(event:any): void {
    console.log(event);
  }

  loadDataFromServer(): void {
    // this.loading = true;
    let params = {
      customerId: this.customerId,
      vipLevelId: this.vipLevelId
    }

    this.http.post('/api/mobile/vipLevel/vipLevelUpgradeCard/init', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail("网络繁忙，请稍后再试!");
      }
      this.rawVipLevelUpgradeCards = res.vipLevelUpgradeCards;
      this.filtedVipLevelUpgradeCards = this.rawVipLevelUpgradeCards;
      this.vipLevelUpgradeCardPayment = res.vipLevelUpgradeCardPayment;
      this.usedCount = res.usedCount;
      this.total = res.total;
      this.unusedCount = res.unusedCount;
    });
  }

  updateRemark(): void {
    // this.loading = true;
    let params = {
      id: this.checkingVipLevelUpgradeCard.id,
      remark: this.checkingVipLevelUpgradeCard.remark
    }

    this.http.post('/api/mobile/vipLevel/vipLevelUpgradeCard/updateRemark', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        // this._toast.fail("网络繁忙，请稍后再试!");
      }
      // this._toast.success("网络繁忙，请稍后再试!")
    });
  }

  filterVipLevelUpgradeCards(event?:any): void {
    if (event) {
      if (event.index == 0) this.cardUsedStatusFilter = undefined;
      if (event.index == 1) this.cardUsedStatusFilter = 0;
      if (event.index == 2) this.cardUsedStatusFilter = 1;
    }

    this.filtedVipLevelUpgradeCards = this.rawVipLevelUpgradeCards;

    if (this.cardUsedStatusFilter != undefined)
      this.filtedVipLevelUpgradeCards = this.rawVipLevelUpgradeCards.filter(x => x.alreadyUsed == this.cardUsedStatusFilter);
    else
      this.filtedVipLevelUpgradeCards = this.rawVipLevelUpgradeCards;

    if (this.keywordFilter) {
      this.filtedVipLevelUpgradeCards = this.filtedVipLevelUpgradeCards.filter(
        x => (x.remark && x.remark.indexOf(this.keywordFilter!) > -1)
          || x.cardNo.indexOf(this.keywordFilter!) > -1
          || (x.userInviteCode && x.userInviteCode.indexOf(this.keywordFilter!) > -1)
          || (x.userName && x.userName.indexOf(this.keywordFilter!) > -1)
      );
    }

    if (this.vipLevelIdFilter) {
      this.filtedVipLevelUpgradeCards = this.filtedVipLevelUpgradeCards.filter(
        x => x.vipLevelId == this.vipLevelIdFilter
      );
    }
  }

  copyText(text: string): void {
    let activityLinkConvertInfo: ActivityLinkConvertInfo = {
      shareBasePictureUrl: "", url: "", wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
      text: text, copyBeforeAction: text,
    }
    let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";

    if (this.android) {
      // @ts-ignore
      window.Android.copyText(s);
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.copyText.postMessage(s);
    }
    return;
  }

  shareText(text: string): void {
    let activityLinkConvertInfo: ActivityLinkConvertInfo = {
      shareBasePictureUrl: "", url: "", wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
      text: text, copyBeforeAction: text,
    }
    let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";

    if (this.android) {
      // @ts-ignore
      window.Android.textShare(s);
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.textShare.postMessage(s);
    }
    return;
  }

}
