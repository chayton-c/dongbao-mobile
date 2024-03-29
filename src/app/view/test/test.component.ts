import {ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {VipLevelUpgradeCard} from "../../pojo/vip-level/vip-level-upgrade-card";
import {ModalService, ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  android: number = 0;
  ios: number = 0;
  akagi = false;
  customerId: string = "";

  rawVipLevelUpgradeCards: VipLevelUpgradeCard[] = [];
  cardUsedStatusFilter?: number;
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
  thumbStyle = {
    width: '32px',
    height: '32px'
  };

  constructor(
    private _toast: ToastService,
    private http: HttpClient,
    private location: Location,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public modalService: ModalService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.android) this.android = queryParams.android;
      if (queryParams.ios) this.ios = queryParams.ios;

      this.loadDataFromServer();
    });
  }

  ngOnInit(): void {
    // document.body.style.backgroundImage = "linear-gradient(to right bottom, #F1E3E7, #D9E1EE)";
    // setTimeout(() => this.akagi = true, 500);
  }

  backPreviousPage(): void {
    this.location.back();
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
      customerId: this.customerId
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

    console.log(event);
    console.log("filterVipLevelUpgradeCards");
    if (this.cardUsedStatusFilter != undefined)
      this.filtedVipLevelUpgradeCards = this.rawVipLevelUpgradeCards.filter(x => x.alreadyUsed == this.cardUsedStatusFilter);
    else
      this.filtedVipLevelUpgradeCards = this.rawVipLevelUpgradeCards;

    if (this.keywordFilter)
      this.filtedVipLevelUpgradeCards = this.filtedVipLevelUpgradeCards.filter(
        x => (x.remark && x.remark.indexOf(this.keywordFilter!) > -1)
          || x.cardNo.indexOf(this.keywordFilter!) > -1
          || (x.userInviteCode && x.userInviteCode.indexOf(this.keywordFilter!) > -1)
          || (x.userName && x.userName.indexOf(this.keywordFilter!) > -1)
      );
  }

  jump2Cardpurchase() {
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

}
