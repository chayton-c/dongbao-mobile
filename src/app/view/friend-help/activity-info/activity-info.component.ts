import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../../util/http/http-util";
import {FriendsHelp} from "../../../pojo/friends-help/friends-help";
import {FriendsHelpActivity} from "../../../pojo/friends-help/friends-help-activity";
import {Customer} from "../../../pojo/system/customer";
import {WebkitUtil} from "../../../util/webkit-util";
import {MatDialog} from "@angular/material/dialog";
import {MsgUtil} from "../../../util/msg-util";

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.less']
})
export class ActivityInfoComponent implements OnInit {

  // 好友发起助力
  initiatingCustomerId?: string; // 助力发起人
  initiatingCustomer?: Customer;
  initiaingCustomerFriendsHelp = false;
  initiaingCustomerFriendsHelpCanceled = false;
  initiaingCustomerFriendsSend = false;
  messageTitle: string = "";
  messageContnet: string = "";
  hasSettlementRecord = false;

  customerId: string; // 登录用户
  id: string;
  android: number = 0;
  Math = Math;
  friendsHelps: FriendsHelp[] = [];
  friendsHelpsCount = 0;
  friendsHelpActivity: FriendsHelpActivity = {
    canBePurchased: 0, detailImageUrl: "", friendsRequired: 0, id: "", imageUrl: "", price: 0, rule: "", seq: 0, title: ""
  };
  password: string = "";
  startThirtyDaysLoginGoldCoinsCommission: number = 0;
  loading = false;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private titleService: Title,
    public dialog: MatDialog,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#F9713C';

    // this.titleService.setTitle("100元话费券免费领");
    this.customerId = "";
    this.id = "";
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.id) this.id = queryParams.id;
      if (queryParams.friendsHelpActivityId) this.id = queryParams.friendsHelpActivityId;
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.initiatingCustomerId) this.initiatingCustomerId = queryParams.initiatingCustomerId;
      if (queryParams.android) this.android = queryParams.android;
    });
  }

  ngOnInit(): void {
    let detailParams = {
      id: this.id,
      customerId: this.customerId,
      initiatingCustomerId: this.initiatingCustomerId
    }

    this.http.post('/api/mobile/friendsHelp/activity/detail', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      this.friendsHelpActivity = res.friendsHelpActivity;
      this.friendsHelps = res.friendsHelps;
      this.hasSettlementRecord = res.hasSettlementRecord;

      this.friendsHelpsCount = this.friendsHelps ? this.friendsHelps.length : 0;

      console.log(this.friendsHelpActivity.friendsRequired > this.friendsHelpsCount);
      if (this.friendsHelpActivity.friendsRequired > this.friendsHelpsCount) {
        for (let i = 0; i < this.friendsHelpActivity.friendsRequired - this.friendsHelpsCount; i++) {
          this.friendsHelps.push({
            customerId: "",
            friendsAvatar: "http://shenghenduooss.gohong.com/dongbao-mobile/friends-help/activity-info/default-avatar.png",
            friendsCustomerId: "", friendsHelpActivityId: "", friendsName: "", id: ""
          });
          console.log(this.friendsHelps);
        }
      }

      this.startThirtyDaysLoginGoldCoinsCommission = res.startThirtyDaysLoginGoldCoinsCommission;
      this.initiatingCustomer = res.initiatingCustomer;
      this.initiaingCustomerFriendsHelp = !!res.initiatingCustomer;
    });
  }

  createPassword(): void {
    this.loading = true;
    let params = {
      id: this.id,
      customerId: this.customerId
    }

    this.http.post('/api/mobile/friendsHelp/activity/createPassword', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      this.loading = false;
      this.password = res.password;
      if (this.android == 1) {
        console.log(this.android)
        WebkitUtil.copyText(res.password, 1);
      }

      let shareBasePictureUrl = "http://shenghenduo.oss-cn-beijing.aliyuncs.com/dongbao-mobile/friends-help/eleme-activity/poster.jpg";
      shareBasePictureUrl = "http://shenghenduo.oss-cn-beijing.aliyuncs.com/dongbao-mobile/friends-help/activity-info/poster.jpg";

      WebkitUtil.postMessage(
        WebkitUtil.COPY_AND_SHARE_IMAGE_THEN_SHARE_ON_WECHAT_MINIPROGRAM, {
          copyBeforeAction: res.password, shareBasePictureUrl: "http://shenghenduo.oss-cn-beijing.aliyuncs.com/dongbao-mobile/friends-help/eleme-activity/poster.jpg",
          url: "", wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "http://shenghenduo.oss-cn-beijing.aliyuncs.com/dongbao-mobile/friends-help/eleme-activity/0.png",
          text: this.password
        }, this.android == 1 ? 1 : undefined
      );
    });
  }

  jump2Purchase():void {
    if (this.id == '-1') {
      this.jump2Eleme();
      return;
    }

    let redirectUrl = window.location.origin + "/friends-help/purchase?customerId="
      + this.customerId + "&android=" + this.android;

    WebkitUtil.postMessage(WebkitUtil.CREATE_URL, {
      copyBeforeAction: "",
      shareBasePictureUrl: "",
      text: "",
      title: "",
      url: "",
      wxMiniprogramOriginalId: "",
      wxMiniprogramPath: "",
      wxMiniprogramQrcodeUrl: ""
    }, this.android, {
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "充值中心"
    });
  }

  jump2Eleme():void {
    let redirectUrl = window.location.origin + "/multiple-button-activity?id=739338480118661120&customerId="
      + this.customerId + "&android=" + this.android;

    WebkitUtil.postMessage(WebkitUtil.CREATE_URL, {
      copyBeforeAction: "",
      shareBasePictureUrl: "",
      text: "",
      title: "",
      url: "",
      wxMiniprogramOriginalId: "",
      wxMiniprogramPath: "",
      wxMiniprogramQrcodeUrl: ""
    }, this.android, {
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "饿了么免单"
    });
  }

  createFriendsHelp(): void {
    if (!this.initiatingCustomerId) return;
    this.initiaingCustomerFriendsSend = true;

    let friendsHelpParams = {
      id: this.id,
      customerId: this.customerId,
      initiatingCustomerId: this.initiatingCustomerId
    }

    // 发起助力
    this.http.post('/api/mobile/friendsHelp/activity/friendsHelp', HttpUtils.createBody(friendsHelpParams), HttpUtils.createHttpOptions())
      .subscribe((res: any) => {
        this.messageTitle = res.messageTitle;
        this.messageContnet = res.messageContnet;
      });
  }

  payment(): void {
    this.loading = true;
    let params = {
      friendsHelpActivityId: this.id,
      customerId: this.customerId
    }

    // 加载上级
    this.http.post('/api/mobile/fiendsHelp/friendsHelpActivityOrder/createOrder', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      this.loading = false;
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      WebkitUtil.wechatPayment(res.paymentParams, this.android);
    });
  }
  showRules(): void {
    if (this.id == '-1') {
      this.elemeRules();
      return;
    }

    MsgUtil.showErrorMsg(this.dialog,
      "活动规则：\n" +
      "1.活动时间：\n" +
      "2022年9月26日00:00-2022年12月30日23:59:59\n" +
      "2.活动主题\n" +
      "好友助力，得100元话费券\n" +
      "3.活动对象：\n" +
      "移动、联通、电信用户\n" +
      "活动内容：\n" +
      "活动期间，用户登录外卖省多多APP,参加“好友助力得100元话费券”活动，邀请8位好友为其助，即可得100元话费券，活动限量1800份，奖品先到先得，数量有限，送完即止。\n" +
      "5.活动细则：\n" +
      "1) 参与用户必须是外卖省多多用户，需绑定手机号码。\n" +
      "2) 参加活动后需邀请新用户下载外卖省多多App，完成账号注册，绑定手机号，并让好友帮您完成助力。\n" +
      "3) 被邀请者必须是 2022年9月1日0点以后注册的外卖省多多用户，新用户注册登录外卖省多多APP后，需要绑定手机号才能帮助好友助力。\n" +
      "4) 被邀请的平台新用户绑定手机号后自动获得10元新人红包，同时也可以参与邀请新用户参加活动。\n" +
      "5)2022年12月30日23:59:59活动下线，下线前未完成邀请任务的用户，视为放弃本活动。\n" +
      "\n" +
      "6.奖品说明：\n" +
      "1） 用户获得的100元话费券（50减7话费券一张、200减13话费券一张、100减5元话费券6张、200减10话费券5张），话费券不可叠加使用。\n" +
      "2) 新用户参与拉新活动奖品为10元新人红包，新用户助力成功，即可获得10元新人红包，例如：新用户完成助力成功，外卖省多多领多多币将到账10元新人红包（30天内领取）。\n" +
      "3）邀请者成功邀请新用户，将可以获得对应的奖励，奖品数量有限，先到先得，送完即止。话费券首月可用2张，次月每月可用1张，充值后84小时内到账。\n" +
      "4）奖品数量有限，奖品发放以实际到账奖品为准（拉新成功但奖品未到账，是因为奖品已抢完，不予补发奖品）；\n" +
      "5) 包含但不仅限于同一登录账号、同一手机号、同一终端设备号、同一收货手机号和地址、同一支付账户同一IP或其它合理显示为同一用户的情形均视为同一用户。同一用户每阶段奖励均只有1次获奖机会且不可互相邀请，一旦发现有违规操作用户，取消活动参与资格，取消获奖资格，奖品不予发货。\n" +
      "6)为保证活动公平公正，如发现用户通过不正当手段（包括但不限于作弊、网络攻击、恶意套现、虚假交易、刷机刷票、购买僵尸号等等），外卖省多多有权取消违规用户的活动资格，禁止其参与活动，并取消其获得的奖品，必要时追究法律责任。\n" +
      "\n" +
      "7.特别说明：\n" +
      "1）新用户必须为2022年9月1日0点以后新注册的外卖省多多用户，并且必须绑定手机号。新用户若未绑定手机号，则该用户不会被记录为【成功邀请的新用户】。同一个手机号只可被成功邀请一次。\n" +
      "2）用户通过以下行为参与活动的，将被判定为风险用户，外卖省多多有权取消活动参与资格并取消订单:\n" +
      "a.超出兑换数量;\n" +
      "b.使用虚拟运营商手机号、运营商手机小号注册或绑定外卖省多多帐号等扰乱平台交易秩序、交易规则的行为。因近期出现大量刷机行为，为保证活动公平，系统将限制号段为162、165、167、170、171的手机号参与活动（包括参与活动和帮助他人助力，将被认定为无效），请使用其他手机号码参与活动，感谢您的理解;\n" +
      "c.存在违反活动规则的行为，包含但不限于刷单套利、恶意下单、恶意退换货等;\n" +
      "d.用户通过其他不正当手段 (包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、破坏正当交易秩序、提供虚假信息等方式)达成交易的行为;\n" +
      "e.外卖省多多账户信息、身份证号码、手机号码（含收货手机号）、设备号、支付ID、同一IP网络操作日志等或其它合理显示为同一用户的情形均视为同一用户，同一用户均只有1次获奖机会且不可互相邀请，一旦发现有违规操作用户，取消活动参与资格，取消获奖资格，奖品不予发货。前述管理措施将同样适用于用户的关联帐号;\n" +
      "f.若通过不正当手段获取奖励，经查实，外卖省多多APP有权撤销该用户的活动资格并取消其奖励，情节严重者将追究其法律责任；\n" +
      "3）活动火爆，完成活动优惠券暂未到账，请耐心等待刷新页面多尝试几次；\n" +
      "4）后台奖品发放有延迟，奖品发放以实际到账奖品为准（部分延迟可能导致拉新成功但奖品未到账，可视为奖品已抢完，不予补发奖品）；\n" +
      "5）外卖省多多APP不会以任何方式向用户索要钱财换取奖品，请注意甄别。\n" +
      "6）本活动如有疑问，您可进入外卖省多多APP-我的-联系客服 获得帮助。\n" +
      "7）充值高峰、大促活动期、以及运营商系统维护等特殊时期，话费充值到账可能延迟；\n" +
      "8）携号转网用户号码可能会充值失败，如携号转网用户获得5元话费券，建议用户为非携号转网手机号码充值；\n" +
      "9）本活动与APPLE.INC苹果公司无关。\n", 300000, "活动规则");
    return;
  }
  elemeRules(): void {
    MsgUtil.showErrorMsg(this.dialog,
      "活动规则\n" +
      "活动规则：\n" +
      "1.活动时间：\n" +
      "2022年10月11日00:00-2022年10月11日23:59:59\n" +
      "2.活动主题\n" +
      "好友助力，免费得挪威咖啡\n" +
      "3.活动对象：\n" +
      "杭州市、武汉市用户\n" +
      "活动内容：\n" +
      "活动期间，用户登录外卖省多多APP,参加“好友助力免费得挪威咖啡”活动，邀请5位好友为其助，即可免费得挪威咖啡，活动限量1000份，奖品先到先得，数量有限，送完即止。\n" +
      "5.活动细则：\n" +
      "1) 参与用户必须是外卖省多多用户，需绑定手机号码。\n" +
      "2) 参加活动后需邀请新用户下载外卖省多多App，完成账号注册，绑定手机号，并让好友帮您完成助力。\n" +
      "3) 被邀请者必须是 2022年10月11日0点以后注册的外卖省多多用户，新用户注册登录外卖省多多APP后，需要绑定手机号才能帮助好友助力。\n" +
      "4) 被邀请的平台新用户绑定手机号后自动获得10元新人红包，同时也可以参与邀请新用户参加活动。\n" +
      "5)2022年10月11日23:59:59活动下线，下线前未完成邀请任务的用户，视为放弃本活动。\n" +
      "\n" +
      "6.奖品说明：\n" +
      "1）用户免费得挪威咖啡（实付金额高于12元至高补贴12元，低于12元全额补贴）,超级会员红包叠加活动红包使用。\n" +
      "2）新用户参活动奖品为10元新人红包，新用户助力成功，即可获得10元新人红包，例如：新用户完成助力成功，外卖省多多领多多币将到账10元新人红包（30天内领取）。\n" +
      "3）邀请者成功邀请新用户，将可以获得对应的奖励，奖品数量有限，先到先得，送完即止。助力完成下单，订单该笔订单结算后发放到APP 账号中（可提现到微信零钱）\n" +
      "4）奖品数量有限，奖品发放以实际到账奖品为准（拉新成功但奖品未到账，是因为奖品已抢完，不予补发奖品）；\n" +
      "5) 包含但不仅限于同一登录账号、同一手机号、同一终端设备号、同一收货手机号和地址、同一支付账户同一IP或其它合理显示为同一用户的情形均视为同一用户。同一用户每阶段奖励均只有1次获奖机会且不可互相邀请，一旦发现有违规操作用户，取消活动参与资格，取消获奖资格，奖品不予发货。\n" +
      "6)为保证活动公平公正，如发现用户通过不正当手段（包括但不限于作弊、网络攻击、恶意套现、虚假交易、刷机刷票、购买僵尸号等等），外卖省多多有权取消违规用户的活动资格，禁止其参与活动，并取消其获得的奖品，必要时追究法律责任。\n" +
      "\n" +
      "7.特别说明：\n" +
      "1）新用户必须为2022年10月10日0点以后新注册的外卖省多多用户，并且必须绑定手机号。新用户若未绑定手机号，则该用户不会被记录为【成功邀请的新用户】。同一个手机号只可被成功邀请一次。\n" +
      "2）用户通过以下行为参与活动的，将被判定为风险用户，外卖省多多有权取消活动参与资格并取消订单:\n" +
      "a.超出兑换数量;\n" +
      "b.使用虚拟运营商手机号、运营商手机小号注册或绑定外卖省多多帐号等扰乱平台交易秩序、交易规则的行为。因近期出现大量刷机行为，为保证活动公平，系统将限制号段为162、165、167、170、171的手机号参与活动（包括参与活动和帮助他人助力，将被认定为无效），请使用其他手机号码参与活动，感谢您的理解;\n" +
      "c.存在违反活动规则的行为，包含但不限于刷单套利、恶意下单、恶意退换货等;\n" +
      "d.用户通过其他不正当手段 (包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、破坏正当交易秩序、提供虚假信息等方式)达成交易的行为;\n" +
      "e.外卖省多多账户信息、身份证号码、手机号码（含收货手机号）、设备号、支付ID、同一IP网络操作日志等或其它合理显示为同一用户的情形均视为同一用户，同一用户均只有1次获奖机会且不可互相邀请，一旦发现有违规操作用户，取消活动参与资格，取消获奖资格，奖品不予发货。前述管理措施将同样适用于用户的关联帐号;\n" +
      "f.若通过不正当手段获取奖励，经查实，外卖省多多APP有权撤销该用户的活动资格并取消其奖励，情节严重者将追究其法律责任；\n" +
      "3）活动火爆，完成活动优惠券暂未到账，请耐心等待刷新页面多尝试几次；\n" +
      "4）后台奖品发放有延迟，奖品发放以实际到账奖品为准（部分延迟可能导致拉新成功但奖品未到账，可视为奖品已抢完，不予补发奖品）；\n" +
      "5）外卖省多多APP不会以任何方式向用户索要钱财换取奖品，请注意甄别。\n" +
      "6）本活动如有疑问，您可进入外卖省多多APP-我的-联系客服 获得帮助。\n" +
      "7）订单免单返还24小时内到账；\n" +
      "8）本活动与APPLE.INC苹果公司无关。\n", 300000, "活动规则");
    return;
  }
}
