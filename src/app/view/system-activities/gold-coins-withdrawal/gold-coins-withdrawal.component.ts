import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {HttpUtils} from "../../../util/http/http-util";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {GoldCoinsWithdrawal, GoldCoinsWithdrawalConstant} from "../../../pojo/currency/gold-coins-withdrawal";

@Component({
  selector: 'app-gold-coins-withdrawal',
  templateUrl: './gold-coins-withdrawal.component.html',
  styleUrls: ['./gold-coins-withdrawal.component.less']
})
export class GoldCoinsWithdrawalComponent implements OnInit {

  customerId?: string;
  goldCoinsWithdrawalConstant: GoldCoinsWithdrawalConstant = new GoldCoinsWithdrawalConstant();
  goldCoinsWithdrawals: GoldCoinsWithdrawal[] = [];

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
    this.titleService.setTitle("提现");

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
    });

    this.initPage();
  }

  initPage(): void {
    let param = {
      customerId: this.customerId,
    }

    this.http.post('/api/mobile/currency/goldcoins/goldCoinsWithdrawal/init', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) return;

      console.log(res.hasWithdrawal)
      console.log(res.goldCoinsWithdrawalLimits)

    });
  }

}
