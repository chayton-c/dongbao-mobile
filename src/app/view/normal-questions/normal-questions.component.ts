import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-normal-questions',
  templateUrl: './normal-questions.component.html',
  styleUrls: ['./normal-questions.component.less']
})
export class NormalQuestionsComponent implements OnInit {
  @ViewChild('title1', { read: TemplateRef }) title1!:TemplateRef<any>;

  qas = [
    {
      title: '关于订单',
      accordions: [
        {
          title: '1、已收到货还在入账中？',
          child: ['虽然实物已经收到，但是没有主动去点确认收货，需要等自然日变更为确认收货。这样入账中的状态变更为已入账。'],
          open: false
        },
        {
          title: '2、已收到货订单状态是维权？',
          child: ['如果确认收货之后的订单，在去申请售后退货或退款这样的情况，订单就会是维权订单啦。'],
          open: false
        },
      ]
    },
    {
      title: '关于外卖',
      accordions: [
        {
          title: '1、领取外卖红包后，点外卖没有使用该红包也有佣金？',
          child: ['只要点外卖之前您在App内领取了外卖红包，使用与不使用红包点外卖都会有佣金和能量奖励。'],
          open: false
        },
        {
          title: '2、美团到店美食（团购）购买代金券或套餐券后，没有该订单。',
          child: ['需要到店核销后的24小时之内才会有此订单及返佣和能量奖励。'],
          open: false
        },
        {
          title: '3、领到了1-3元的劵，但是支付还是原代金券和套餐券价格？',
          child: ['支付之前，请先选择一下优惠券，这样就会在原价上减去优惠券。'],
          open: false
        },
      ]
    },
    {
      title: '关于返佣',
      accordions: [
        {
          title: '1、为什么下单后没有佣金？',
          child: ['【大家注意】购买时请注意以下几点，90%会得不到佣金哦', '❶领券后加入购物车或收藏之后购买'],
          open: false
        },
        {
          title: '2、美团到店美食（团购）购买代金券或套餐券后，没有该订单。',
          child: ['需要到店核销后的24小时之内才会有此订单及返佣和能量奖励。'],
          open: false
        },
        {
          title: '3、领到了1-3元的劵，但是支付还是原代金券和套餐券价格？',
          child: ['支付之前，请先选择一下优惠券，这样就会在原价上减去优惠券。'],
          open: false
        },
      ]
    },
  ]

  onChange(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
