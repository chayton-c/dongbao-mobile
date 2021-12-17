import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {Goods} from "../../pojo/goods/goods";

@Component({
  selector: 'app-taobao-test',
  templateUrl: './taobao-test.component.html',
  styleUrls: ['./taobao-test.component.less']
})
export class TaobaoTestComponent implements OnInit {

  keyword: string = "";
  goodsList: Goods[] = [];

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    public router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  copyInputMessage(val: string){
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

    this.http.post('/api/app/goods/search?platform=1&page=1&debug=true&customerId=1&keyword=' + this.keyword, null, {
      headers: {}
    }).subscribe((res: any) => {
      console.log(res)
      this.goodsList = res.goods;
    });
  }
}
