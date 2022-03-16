import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {
  // @ViewChild('title1', { read: TemplateRef }) title1!:TemplateRef<any>;

  height = 500;

  qas = [
    {
      title: '订单',
      accordions: [
        {
          title: '1、已收到货还在入账中？',
          child: {
            content: '虽然实物已经收到，但是没有主动去点确认收货，需要等自然日变更为确认收货。这样入账中的状态变更为已入账。'
          },
          open: false
        },
        {
          title: '2、已收到货订单状态是维权？',
          child: {
            content: '如果确认收货之后的订单，在去申请售后退货或退款这样的情况，订单就会是维权订单啦。'
          },
          open: false
        },
      ]
    },
    {
      title: '外卖',
      accordions: [
        {
          title: '1、领取商超红包下单后没有佣金？',
          child: {
            lines: [
              '商超红包：需要使用领取的红包，不使用该红包无佣金。',
              '外卖红包：点外卖之前您在App内领取了外卖红包，使用与不使用红包，点外卖都会有佣金和能量奖励。'
            ]
          },
          open: false
        },
        {
          title: '2、到店美食(美团团购)购买后没有订单？',
          child: {
            content: '需要到店核销后的24小时之内才会有此订单及返佣和能量奖励。'
          },
          open: false
        },
        {
          title: '3、领到了1-3元劵,支付还是原券价格？',
          child: {
            content: '支付之前，请先选择一下优惠券，这样就会在原价上减去优惠券。'
          },
          open: false
        },
      ]
    },
    {
      title: '返佣',
      accordions: [
        {
          title: '1、为什么下单后没有佣金？',
          child: {
            lines: [
              '【大家注意】购买时请注意以下几点，90%会得不到佣金哦',
              '❶领券后加入购物车或收藏之后购买',
              '❷使用集分宝、红包以及其他第三方优惠',
              '❸领券后拍了店铺的其他商品有可能会没有佣金',
              '❹咨询店家时通过淘宝客服发的商品链接下单',
              '❺使用手机淘宝以外的任何手机APP下单 ',
              ' ',
              '正确的下单方式：',
              '（1）复制淘宝或京东、拼多多口令或链接后打开外卖省多多App点击“购买返”→App自动唤起淘宝→领券→立即下单。',
              '（2）在外卖省多多App搜索选择商品→点击“购买返”→自动唤起淘宝App领劵→立即下',
            ]
          },
          open: false
        },
        {
          title: '下单后佣金与页面显示的不一致？',
          child: {
            lines: [
              '（1）返利、优惠券都是商家提供设置的，在商品推广期间如果商家调整了返利和优惠券，而APP数据更新需要时间。如果查询或者购买正在数据更新期间，就会导致这个情况的呢。',
              '（2）买家使用各种红包、集分宝、淘金币等支付、购物津贴等其他优惠也会导致收益减少。返利以最终下单后获得的返利为准',
            ]
          },
          open: false
        }
      ]
    },
    {
      title: '优惠券',
      accordions: [
        {
          title: '1、为什么领劵提示优惠券已失效？',
          child: {
            content: '因为商家设置的优惠券是有时效的，等过了时效优惠券就会显示失效啦。'
          },
          open: false
        },
        {
          title: '2、领劵下单一直无法跳转怎么解决？',
          child: {
            lines: [
              '（1）有可能是您手机网络的问题，您切换一下网络试一下。',
              '（2）您可以关闭APP，重新打开试试。',
              '（3）以上两种方法都不行时，有可能商品本身的原因，您可以联系我们官方客服，将问题反馈给客服哦！',
            ]
          },
          open: false
        }
      ]
    },
    {
      title: '分享',
      accordions: [
        {
          title: '1、怎么分享优惠券？',

          child: {
            content: '在外卖省多多App中，打开您想要分享的商品，下方会有一个“分享赚”，点击您即可分享了。'
          },
          open: false
        },
        {
          title: '2、怎么邀请注册？',

          child: {
            content: '打开您的外卖省多多App，点击“我的”、“邀请好友”，您可以选择“复制邀请链接”或“分享邀请海报”，将链接或海报发送给您的好友或分享到朋友圈，让他通过邀请链接或识别海报中的二维码下载即可。'
          },
          open: false
        }
      ]
    },
    {
      title: '提现',
      accordions: [
        {
          title: '1、什么时候可以提现？',

          child: {
            content: '订单状态为已入账。可提现的余额就会增加。随时可提。'
          },
          open: false
        },
        {
          title: '2、如何提现？',

          child: {
            content: '打开外卖省多多App，点击下方“我的”，点击“我的收益”，点击“提现”，如果有可提余额，选择您要提现的金额即可。'
          },
          open: false
        },
        {
          title: '3、为什么提现500时第二天才到账',

          child: {
            content: '可提现（1-20元）随时到账哦。超过20元进入人工审核。'
          },
          open: false
        },
        {
          title: '4、提现时提示“今日已达到提现次数上限”',

          child: {
            content: '余额提现每个用户每天只能提一次。避免多次给官方带来大量的审核压力，从而影响提现到账的速度与效率。'
          },
          open: false
        }
      ]
    },
  ]

  onChange(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.height = window.outerHeight;
  }

}
