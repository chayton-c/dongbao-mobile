import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EnergyGiftActivity, EnergyGiftActivityConstant} from "../../../pojo/currency/energy-gift-activity";
import {GoldCoinsGiftActivityConstant, GoldCoinsGifyActivity} from "../../../pojo/currency/gold-coins-gify-activity";
import {GoldCoinsHeap, GoldCoinsHeapConstant} from "../../../pojo/currency/gold-coins-heap";
import {Customer} from "../../../pojo/system/customer";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {ViewportScroller} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Title} from "@angular/platform-browser";
import {HttpUtils} from "../../../util/http/http-util";

let goldCoinsUpAndDown = trigger('goldCoinsUpAndDown', [
  // ...
  state('up', style({
    position: 'relative',
    top: -8,
  })),
  state('down', style({
    position: 'relative',
    top: 8,
  })),
  transition('up => down', [
    animate('1s')
  ]),
  transition('down => up', [
    animate('1s')
  ]),
]);

let receiveGoldCoinsHeaps = trigger('receiveGoldCoinsHeaps', [
  // ...
  state('received', style({
    width: 0,
    height: 0,
    position: 'absolute',
    top: 20,
    left: 30
  })),
  transition('normal => received', [
    animate('1s')
  ]),
]);

/**
 * 金币活动主页
 */
@Component({
  selector: 'app-activities-domain',
  templateUrl: './activities-domain.component.html',
  styleUrls: ['./activities-domain.component.less'],
  animations: [
    goldCoinsUpAndDown,
    receiveGoldCoinsHeaps
  ],
})
export class ActivitiesDomainComponent implements OnInit {

  energyGiftActivityConstant: EnergyGiftActivityConstant = new EnergyGiftActivityConstant();
  goldCoinsGiftActivityConstant: GoldCoinsGiftActivityConstant = new GoldCoinsGiftActivityConstant();
  goldCoinsHeapConstant: GoldCoinsHeapConstant = new GoldCoinsHeapConstant();

  customerId: string | undefined;
  customer: Customer = {};
  goldCoinsHeaps: GoldCoinsHeap[] = [];
  receiveAtFixTimeGoldCoinsGiftActivities: GoldCoinsGifyActivity[] = [];

  dailySignInEnergyGiftActivities: EnergyGiftActivity[] = [];
  watchingAdEnergyGiftActivitySettings: EnergyGiftActivity | undefined;
  watchingAdEnergyGiftActivities: EnergyGiftActivity[] = [];
  currentSignIndex: number = 0;
  watchingAdCountEnergyCount: number = 0;

  goldCoinsHeapShakeCommander = 1;

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    public router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("钻石收取");

    // 金币晃动动画
    setInterval(() => {
      if (this.goldCoinsHeapShakeCommander > 0) {
        this.goldCoinsHeapShakeCommander = this.goldCoinsHeapShakeCommander - 2;
        return;
      }
      if (this.goldCoinsHeapShakeCommander < 0) {
        this.goldCoinsHeapShakeCommander = this.goldCoinsHeapShakeCommander + 2;
        return;
      }
    }, 1000);

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
    });

    this.http.post('/api/mobile/currency/goldCoins/goldCoinsReceive/init?customerId=' + this.customerId, null, {
      headers: {}
    }).subscribe((res: any) => {
      console.log(res)
      this.customer = res.customer;


      this.goldCoinsHeaps = res.goldCoinsHeaps;
      this.goldCoinsHeaps.forEach(x => x.receivedStatus = this.goldCoinsHeapConstant.NORMAL);

      this.receiveAtFixTimeGoldCoinsGiftActivities = res.receiveAtFixTimeGoldCoinsGiftActivities;
      this.dailySignInEnergyGiftActivities = res.dailySignInEnergyGiftActivities;

      // 用currentSignIndex设置滚动条的scrollLeft
      this.currentSignIndex = this.dailySignInEnergyGiftActivities.find(x => x.currentSign)!.threshold!;
      if (this.currentSignIndex < 5)
        this.currentSignIndex = 0
      else
        this.currentSignIndex -= 3;

      this.watchingAdEnergyGiftActivitySettings = res.watchingAdEnergyGiftActivity;
      let watchingAdEnergyGiftActivityThreshold = this.watchingAdEnergyGiftActivitySettings?.threshold!;
      this.watchingAdCountEnergyCount = this.watchingAdEnergyGiftActivitySettings?.watchingAdCountEnergyCount!;
      if (this.watchingAdCountEnergyCount < 5)
        this.watchingAdCountEnergyCount = 0
      else
        this.watchingAdCountEnergyCount -= 3;

      for (let i = 0; i < watchingAdEnergyGiftActivityThreshold; i++)
        this.watchingAdEnergyGiftActivities.push(this.watchingAdEnergyGiftActivitySettings!)

      this.cdr.detectChanges();
      this.mapGoldCoins(this.goldCoinsHeaps);
    });

  }

  /**
   * 每日签到领取金币
   */
  dailySignIn(dailySignInEnergyGiftActivity: EnergyGiftActivity) {
    this.http.post('/api/mobile/currency/goldCoins/goldCoinsReceive/dailySignIn?customerId=' + this.customerId, null).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail(res.msg, 3000, () => {}, false);
        return;
      }

      this._toast.success('领取成功', 3000, () => {
      }, false);
      dailySignInEnergyGiftActivity.signInStatus = this.energyGiftActivityConstant.SIGNED;
      this.customer.energy! += dailySignInEnergyGiftActivity.amount!;
    });
  }

  /**
   * 把金币放到屏幕上的随机位置
   */
  mapGoldCoins(goldCoinsHeaps: GoldCoinsHeap[]) {
    for (let i = 0; i < goldCoinsHeaps.length; i++) {
      let goldCoinsHeap = goldCoinsHeaps[i];
      // 可生成钻石位置的宽度
      let leftWidth = window.innerWidth - 100;
      if (i < 3) {
        goldCoinsHeap.left = this.getRandomNumber(50, 50 + leftWidth / 3);
        goldCoinsHeap.top = this.getRandomNumber(100, 350);
      }
      if (i >= 3 && i <= 6) {
        goldCoinsHeap.left = this.getRandomNumber(50 + leftWidth / 3, 50 + leftWidth * 2 / 3);
        goldCoinsHeap.top = this.getRandomNumber(100, 350);
      }
      if (i > 6 && i <= 9) {
        goldCoinsHeap.left = this.getRandomNumber(50 + leftWidth * 2 / 3, 50 + leftWidth);
        goldCoinsHeap.top = this.getRandomNumber(100, 350);
      }
    }
  }

  /**
   * 按时间段收取金币
   */
  receiveAtFixTime(receiveAtFixTimeGoldCoinsGiftActivity: GoldCoinsGifyActivity) {
    this.http.post('/api/mobile/currency/goldCoins/goldCoinsReceive/receiveAtFixTime?customerId=' + this.customerId, null).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail(res.msg, 3000, () => {}, false);
        return;
      }

      this._toast.success('领取成功', 3000, () => {
      }, false);
      receiveAtFixTimeGoldCoinsGiftActivity.receiveStatus = this.goldCoinsGiftActivityConstant.RECEIVED;
      this.customer.goldCoinsNumber! += receiveAtFixTimeGoldCoinsGiftActivity.amount!;
    });
  }

  /**
   * 收取金币堆
   */
  receiveGoldCoinsHeap(goldCoinsHeap: GoldCoinsHeap) {
    if (goldCoinsHeap.receivedStatus == this.goldCoinsHeapConstant.RECEIVED)
      return;
    goldCoinsHeap.receivedStatus = this.goldCoinsHeapConstant.RECEIVED;

    setTimeout(() => {

      let param = {
        goldCoinsHeapId: goldCoinsHeap.id,
      }

      this.http.post('/api/mobile/currency/goldCoins/goldCoinsReceive/receiveGoldCoinsHeap', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
        if (!res.success) {
          // this._toast.fail(res.msg, 3000, () => {}, false);
          return;
        }

        this.customer.goldCoinsNumber! += goldCoinsHeap.amount!;
        // this._toast.success('领取成功', 3000, () => {}, false);

        this.goldCoinsHeaps = this.goldCoinsHeaps.filter(x => x.id != goldCoinsHeap.id);

        if (this.goldCoinsHeaps.length == 0)
          this.reloadGoldCoinsHeap();
      });
    }, 1000)
  }

  /**
   * 拉取用户剩余的金币堆
   */
  reloadGoldCoinsHeap() {
    this.http.post('/api/mobile/currency/goldCoins/goldCoinsReceive/reloadGoldCoinsHeap?customerId=' + this.customerId, null).subscribe((res: any) => {
        if (!res.success) return;
        let goldCoinsHeaps: GoldCoinsHeap[] = res.goldCoinsHeaps;
        goldCoinsHeaps.forEach(x => {
          x.receivedStatus = this.goldCoinsHeapConstant.NORMAL;
          this.goldCoinsHeaps.push(x)
        });
        this.mapGoldCoins(this.goldCoinsHeaps);
      }
    );
  }

  jump2GoldCoinsWithdrawalPage() {
    this.router.navigate(['/system-activities/gold-coins-withdrawal'], {
      queryParams: { customerId: this.customerId },
    });
  }

  akagi() {
    // @ts-ignore
    window.webkit.messageHandlers.tencentAdvertise.postMessage("akagi=2")
  }

  getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
