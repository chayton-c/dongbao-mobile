import {FriendsHelpGoodsCoupon} from "./friends-help-goods-coupon";

export interface FriendsHelpGoods {

  id: string;
  goodsType: number; // 商品类型
  title: string; // 标题
  description: string; // 描述
  imageUrl: string; // 商品图
  rule: string; // 助力规则
  price: number; // 标价
  actualPrice: number; // 实际价格
  stock: number; // 库存
  seq: number;
  hide: number;

  friendsHelpGoodsCoupon?: FriendsHelpGoodsCoupon;
}
