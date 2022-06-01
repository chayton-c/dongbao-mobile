import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Goods} from "../../pojo/goods/goods";
import {Platform} from "../../pojo/platform";
import {ActionSheetService, ModalService, ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
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
  platform: Platform = new Platform();
  href: string = "";
  showCommission: boolean = false;
  thumbStyle = {
    width: '32px',
    height: '32px'
  };

  constructor(
    private _modal: ModalService,
    private _actionSheet: ActionSheetService,
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
      if (queryParams.showCommission) this.showCommission = queryParams.showCommission;
    });
  }

  copyInputMessage(val: string) {
    this._toast.success('已复制到粘贴板', 3000, () => {
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

  createGoodsLink(goods:Goods) {
    let param = HttpUtils.transform(goods);
    param.customerId = this.customerId;
    param.debug = true;

    if (goods.platform == this.platform.PINDUODUO.id) {
      let param = {
        customerId: this.customerId,
        platform: this.platform.PINDUODUO.id,
        debug: true
      }

      this.http.post('/api/app/customer/auth/pinduoduo', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
        let hasRecord = res.hasRecord;
        if (!hasRecord) {
          let authMobileLink = res.authMobileLink;
          this.showPinduoduoAuthConfirm(authMobileLink);
          return;
        }
      });
    }

    this.http.post('/api/app/goods/createLink', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      goods.shortLink = res.shortLink;
      if (res.kouling)
        goods.shortLink = res.kouling;

      this.copyInputMessage(goods.shortLink!);
    });
  }

  searchGoods(platform: number): void {
    if (!this.keyword) {
      alert("请输入关键字");
      return;
    }

    let param = {
      customerId: this.customerId,
      keyword: this.keyword!,
      platform: platform,
      page: 1,
      debug: true
    }

    this.http.post('/api/app/goods/search', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {

      this.goodsList = res.goods;
    });
  }


  showPinduoduoAuthConfirm(pinduoduoAuthLink: string) {
    this._modal.alert('尚未授权拼多多', '是否前往授权?', [
      { text: '取消'},
      { text: '前往授权', onPress: () => window.location.href = pinduoduoAuthLink }
    ]);
  }

  jump2ActivitiesDomain() {
    // this.router.navigate(['/system-activities/activities-domain'], {
    //   queryParams: {customerId: this.customerId},
    // });
  }

  generateMeituanActivityLink(activityId: string) {
    let param = {
      customerId: this.customerId,
      debug: true,
      activityId: activityId,
    }

    this.http.post('/api/app/meituanLianmeng/generateMeituanActivityLink', HttpUtils.createBody(param), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      console.log(res)

      if (activityId != '24')
        window.location.href = res.link;
      else
        window.location.href = "weixin://gh_870576f3c6f9/subPackages/webview/index?lch=cps:mix:5:5a5d1a75b10e690d8d8a549fd0710145:1:24:118925&url=https%3A%2F%2Fdpurl.cn%2Fr6Rf3GHz"
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

  showActionSheet = () => {
    const BUTTONS = [
      '美团外卖',
      '美团生鲜',
      '美团酒店',
      '美团优选',
      '收取金币',
      '饿了吗外卖',
      '饿了吗百货',
      '取消'
    ];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0: // '美团外卖',
            this.generateMeituanActivityLink('33');
            break;
          case 1: // '美团生鲜',
            this.generateMeituanActivityLink('4');
            break;
          case 2: // '美团酒店',
            this.generateMeituanActivityLink('7');
            break;
          case 3: // '美团优选',
            this.generateMeituanActivityLink('24');
            break;
          case 4: // '收取金币',
            this.jump2ActivitiesDomain();
            break;
          case 5: // '饿了吗外卖',
            this.generateElemeWaimaiActivityLink('20150318019998877');
            break;
          case 6: // '饿了吗百货'
            this.generateElemeWaimaiActivityLink('20150318020004284');
            break;
          default:
            return;
        }
      }
    );
  }

}
