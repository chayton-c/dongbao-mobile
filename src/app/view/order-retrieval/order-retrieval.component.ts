import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../util/http/http-util";
import {DOC_ORIENTATION, NgxImageCompressService} from "ngx-image-compress";
import {CommissionOrder} from "../../pojo/order/commission-order";

@Component({
  selector: 'app-order-retrieval',
  templateUrl: './order-retrieval.component.html',
  styleUrls: ['./order-retrieval.component.less']
})
export class OrderRetrievalComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private platform: Platform,
    private imageCompress: NgxImageCompressService,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#E0D376';
  }

  code?: string;
  parentAvatar?: string;
  parentDisplayName?: string;
  appid?: string = "wx9df689926d70eabb";
  CommissionOrder = CommissionOrder;
  files: {
    url: string
  }[] = [];
  uploadImageUrl = "";
  customerId: string = '';
  customerAvailableCashAmount: number = 0;
  showWithdrawn = false;
  showUploadImageDescription = false;
  copyOrderTutorial = false;
  orderNumber?: string;
  retrievedOrder?: {
    id: string,
    orderImage: string,
    orderNumber: string,
    goodsTitle: string,
    orderStatus: string,
    orderTime: Date,
    orderPrice: number,
    customerCommission: number,
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.code) this.code = queryParams.code;
    });

    // 如果有code,保存用户信息
    if (this.code) {
      let codeParams = {
        code: this.code,
      }

      this.http.post('/api/mobile/wechat/wechatPlatform/saveCustomerInfo', HttpUtils.createBody(codeParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
        if (!res.success) {
          this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
          return;
        }
        this.customerId = res.customerId;
        this.customerAvailableCashAmount = res.customerAvailableCashAmount;
      });
    }
  }

  auth(): boolean {
    if (!this.code && this.isWechat()) {
      let rawUri = window.location.href;
      let encode = encodeURI(rawUri);

      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appid + "&redirect_uri=" + encode + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
      return false;
    }
    return true;
  }

  jump2download(): void {
    this.auth();
    if (this.isWechat()) {
      window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.provincemany";
      // this.showShadow = true;
      return;
    } else if (this.platform.IOS) {
      window.location.href = "https://apps.apple.com/cn/app/%E5%A4%96%E5%8D%96%E7%9C%81%E5%A4%9A%E5%A4%9A-%E7%A7%81%E5%9F%9F%E6%B5%81%E9%87%8F%E5%8F%98%E7%8E%B0%E7%A5%9E%E5%99%A8/id1606496332";
      return;
    } else if (this.platform.ANDROID) {
      window.location.href = "http://shenghenduooss.gohong.com/android/shengduoduo.apk";
      return;
    }

    window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.provincemany";
  }

  withdrawn(): void {
    if (!this.auth()) {
      return;
    }

    if (this.customerAvailableCashAmount <= 0) {
      this._toast.fail("余额不足");
      return;
    }

    this.showWithdrawn = true;
  }

  isWechat(): boolean {
    return navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1;
  }

  fileChange(params: any) {
    const {files, type, index} = params;
    this.files = files;

    if (files.size == 0) return;

    this.imageCompress.compressFile(this.files[0].url, DOC_ORIENTATION.Default, 90, 90).then(
      dataUrlPromise => {
        let uploadParams = {
          file: dataUrlPromise
        }

        this.http.post('/api/upload/uploadStr', HttpUtils.createBody(uploadParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
          console.log(res);
          if (!res.success) {
            this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
          }
          this.uploadImageUrl = res.url;
          console.log(res.url);
        });
      }
    )


  }

  submit(): void {
    this.auth();

    if (!this.orderNumber) {
      this._toast.fail("请输入订单编号");
      return;
    }

    if (!this.uploadImageUrl) {
      this._toast.fail("请上传集赞截图");
      return;
    }

    let params = {
      orderNumber: this.orderNumber,
      customerId: this.customerId,
      uploadImageUrl: this.uploadImageUrl
    }

    this.http.post('/api/mobile/orderRetrieval/elemeOrderRetrieval', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      console.log(res);
      if (!res.success) {
        this._toast.fail(res.msg);
      }
      this.retrievedOrder = res.retrievedOrder;
    });

  }

  imgResultBeforeCompression: string = "";
  imgResultAfterCompression: string = "";

  compressFile() {
    const MAX_MEGABYTE = 2;
    this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
      .then(
        (result: string) => {
          console.log(result);
        },
        (result: string) => {
          console.error('The compression algorithm didn\'t succed! The best size we can do is', this.imageCompress.byteCount(result), 'bytes')
          console.log(result);
        });
  }
}
