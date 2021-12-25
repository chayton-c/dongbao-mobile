import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {Goods} from "../../pojo/goods/goods";
import {HttpUtils} from "../../util/http/http-util";

@Component({
  selector: 'app-taobao-test',
  templateUrl: './taobao-test.component.html',
  styleUrls: ['./taobao-test.component.less']
})
export class TaobaoTestComponent implements OnInit {

  keyword: string = "";
  goodsList: Goods[] = [];
  customerId: string = "";
  href: string = "";

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
    this.href = window.location.href;
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
    });
  }

  copyInputMessage(val: string) {
    this._toast.success('已复制信息' + val, 3000, () => {
    }, false);
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  searchGoods(): void {
    if (!this.keyword) {
      alert("请输入关键字");
      return;
    }

    let param = {
      customerId: this.customerId,
      keyword: this.keyword!,
      platform: 1,
      page: 1,
      debug: true
    }

    this.http.post('/api/app/goods/search', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      console.log(res)
      this.goodsList = res.goods;
    });
  }

  jump2ActivitiesDomain() {
    this.router.navigate(['/system-activities/activities-domain'], {
      queryParams: { customerId: this.customerId },
    });
  }

  generateWaimaiActivityLink() {
    let param = {
      customerId: this.customerId,
      debug: true
    }

    this.http.post('/api/app/meituanLianmeng/generateWaimaiActivityLink', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      console.log(res)
      window.location.href = res.link;
    });
  }

  generateShengxianActivityLink() {
    let param = {
      customerId: this.customerId,
      debug: true
    }

    this.http.post('/api/app/meituanLianmeng/generateShengxianActivityLink', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      console.log(res)
      window.location.href = res.link;
    });
  }
  generateElemeWaimaiActivityLink(activityId: string) {
    let param = {
      customerId: this.customerId,
      activityId: activityId,
      debug: true
    }

    this.http.post('/api/app/meituanLianmeng/generateElemeWaimaiActivityLink', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      window.location.href = res.link;
    });
  }
}
