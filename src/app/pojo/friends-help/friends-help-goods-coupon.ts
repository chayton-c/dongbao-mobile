export interface FriendsHelpGoodsCoupon {
  id: string;
  customerId: string;
  goodsId: string;
  amount: number;
  quota: number;
  used: number; // Constant.TRUE已使用
  timeLimited: number;

  startTimeStr: string;
  endTimeStr: string;
  usable: number; // 可以使用

}
