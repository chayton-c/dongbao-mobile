export interface FriendsHelpActivity {

  id: string;
  title: string;
  imageUrl: string; // 助力活动图片
  detailImageUrl: string; // 助力活动详情页图片
  friendsRequired: number; // 需要助力次数
  rule: string; // 活动规则
  seq: number; // 排序
  canBePurchased: number; // 可通过购买达成助力，不再需要好友助力
  price: number; // 购买达成助力的价格
}
