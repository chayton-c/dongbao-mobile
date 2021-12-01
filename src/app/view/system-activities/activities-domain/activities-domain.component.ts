import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EnergyGiftActivity, EnergyGiftActivityConstant} from "../../../pojo/currency/energy-gift-activity";
import {GoldCoinsGiftActivityConstant, GoldCoinsGifyActivity} from "../../../pojo/currency/gold-coins-gify-activity";
import {GoldCoinsHeap, GoldCoinsHeapConstant} from "../../../pojo/currency/gold-coins-heap";
import {Customer} from "../../../pojo/system/customer";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {ViewportScroller} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

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

  customerId: number | undefined;
  customer: Customer = {};
  goldCoinsHeaps: GoldCoinsHeap[] = [];
  receiveAtFixTimeGoldCoinsGiftActivities: GoldCoinsGifyActivity[] = [];

  dailySignInEnergyGiftActivities: EnergyGiftActivity[] = [];
  watchingAdEnergyGiftActivitySettings: EnergyGiftActivity | undefined;
  watchingAdEnergyGiftActivities: EnergyGiftActivity[] = [];
  dailySignInEnergyGiftActivityPendingSignedThreshold: number = 0;
  watchingAdCountEnergyCount: number = 0;

  goldCoinsHeapCommander = 1;

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private cdr: ChangeDetectorRef,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.goldCoinsHeapCommander > 0) {
        this.goldCoinsHeapCommander = this.goldCoinsHeapCommander - 2;
        return;
      }
      if (this.goldCoinsHeapCommander < 0) {
        this.goldCoinsHeapCommander = this.goldCoinsHeapCommander + 2;
        return;
      }
    }, 1000);

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
    });

    this.http.post('/api/mobile/goldCoinsReceive/init?customerId=' + this.customerId, null, {
      headers: {}
    }).subscribe((res: any) => {
      console.log(res)
      this.customer = res.customer;


      this.goldCoinsHeaps = res.goldCoinsHeaps;
      this.goldCoinsHeaps.forEach(x => x.receivedStatus = this.goldCoinsHeapConstant.NORMAL);

      this.receiveAtFixTimeGoldCoinsGiftActivities = res.receiveAtFixTimeGoldCoinsGiftActivities;
      this.dailySignInEnergyGiftActivities = res.dailySignInEnergyGiftActivities;

      this.dailySignInEnergyGiftActivityPendingSignedThreshold = this.dailySignInEnergyGiftActivities.find(x => x.signInStatus == this.energyGiftActivityConstant.PENDING_SIGNED)!.threshold!;
      if (this.dailySignInEnergyGiftActivityPendingSignedThreshold < 5)
        this.dailySignInEnergyGiftActivityPendingSignedThreshold = 0
      else
        this.dailySignInEnergyGiftActivityPendingSignedThreshold -= 3;

      this.watchingAdEnergyGiftActivitySettings = res.watchingAdEnergyGiftActivity;
      let watchingAdEnergyGiftActivityThreshold = this.watchingAdEnergyGiftActivitySettings?.threshold!;
      this.watchingAdCountEnergyCount = this.watchingAdEnergyGiftActivitySettings?.watchingAdCountEnergyCount!;
      if (this.watchingAdCountEnergyCount < 5)
        this.watchingAdCountEnergyCount = 0
      else
        this.watchingAdCountEnergyCount -= 3;
      for (let i = 0; i < watchingAdEnergyGiftActivityThreshold; i++) {
        this.watchingAdEnergyGiftActivities.push(this.watchingAdEnergyGiftActivitySettings!)
      }

      this.cdr.detectChanges();
      this.mapGoldCoins(this.goldCoinsHeaps);
    });

  }

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

  receiveAtFixTime(receiveAtFixTimeGoldCoinsGiftActivity: GoldCoinsGifyActivity) {
    this.http.post('/api/mobile/goldCoinsReceive/receiveAtFixTime?customerId=' + this.customerId, null).subscribe((res: any) => {
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

  receiveGoldCoinsHeap(goldCoinsHeap: GoldCoinsHeap) {
    goldCoinsHeap.receivedStatus = this.goldCoinsHeapConstant.RECEIVED;

    setTimeout(() => {
      this.http.post('/api/mobile/goldCoinsReceive/receiveGoldCoinsHeap?goldCoinsHeapId=' + goldCoinsHeap.id, null).subscribe((res: any) => {
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

  reloadGoldCoinsHeap() {
    this.http.post('/api/mobile/goldCoinsReceive/reloadGoldCoinsHeap?customerId=' + this.customerId, null).subscribe((res: any) => {
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

  akagi() {
    // @ts-ignore
    window.webkit.messageHandlers.tencentAdvertise.postMessage("akagi=2")
  }

  getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
