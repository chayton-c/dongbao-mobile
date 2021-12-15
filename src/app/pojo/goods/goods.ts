export interface Goods {

  id: string;
  dataSource: number; // 数据的来源（用谁家接口拉的）
  goodsId: string; //
  platform: number; // 商品来源（京东淘宝拼多多）
  title: string; // 商品标题
  shortTitle: string; // 商品短标题
  description: string; // 商品推荐语
  price: number; // 价格
  monthlySales: number; // 月销量
  salesInTwoHours: number; // 两小时内销量
  salesOfTheDay: number; // 本日夏凉
  image: string; // 商品图
  video: string; // 商品视频
  banners: string; // 商品轮播图，多个用逗号隔开
  categoryId: string; // 商品类别id
  shopName: string; // 店铺名
  priceAfterCoupon: number; // 优惠券后价格
  couponAmount: number; // 优惠券金额
  commissionRate: number; // 佣金比例
  commissionAmount: number; // 佣金数量
  couponTotal: number; // 优惠券总量（个数）
  couponRest: number; // 优惠券剩余个数
  couponStartTime: Date; // 优惠券活动开始时间
  couponEndTime: Date; // 优惠券活动结束时间
  actionStartTime: Date; // 活动开始时间
  actionEndTime: Date; // 活动结束实际
  addTime: Date;
  updateTime: Date;

  // pagefields
  shareUrl: string; // 链接
  customerCommission: number; // 用户佣金
  shortLink: string; // 短连接
}
