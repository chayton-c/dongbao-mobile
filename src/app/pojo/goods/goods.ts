export interface Goods {

  id?: string;
  dataSource?: number; // 数据的来源（用谁家接口拉的）
  dataSourceId?: string; // 数据源id（如好单库的商品id）
  platform?: number; // 商品来源（京东淘宝拼多多）
  goodsId?: string; // 商品来源id（如淘宝的itemId）
  title?: string; // 商品标题
  price?: number; // 价格
  highCommissionGoods?: number; // 是高佣商品
  image?: string; // 商品图
  sales?: string; // 销量
  monthlySales?: number; // 月销量，long型排序用
  categoryId?: string; // 商品类别id
  shopName?: string; // 店铺名
  shopType?: number; // 店铺类型
  shopTypeStr?: string; // 店铺类型名
  couponAmount?: number; // 优惠券金额
  goodsAddress?: string; // 发货地
  priceAfterCoupon?: number; // 优惠券后价格
  commissionAmount?: number; // 佣金数量
  commissionRate?: number; // 佣金比例
  goodsUrl?: string; // 商品链接
  couponUrl?: string; // 优惠券链接

  // pagefields
  shortLink?: string; // 短连接
  schemeUrl?: string; // schemeUrl
  shopRate?: number; // 店铺评分
  customerCommission?: number; // 用户预估佣金
  customerEnergy?: number; // 用户预估能量
  collectedByCustomer?: number;
  pinduoduoSearchId?: string; //  拼多多searchId，转链的时候传进去加佣金
  banners?: string; // 商品轮播图，多个用逗号隔开
  bannerList?: string[];
  description?: string; // 商品推荐语

  couponQuota?: string; // 优惠券门槛
}
