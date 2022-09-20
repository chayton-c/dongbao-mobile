export interface FriendsHelpActivity {

  id: string;
  goodsId: string;
  title: string;
  imageUrl: string;
  detailImageUrl: string;
  dailyStockInitialValue: number;
  hourlyInventoryDecay: number;
  friendsRequired: number;
  couponAmount: number;
  couponQuota: number;
  couponCount: number;
  availableBeforeFriendsHelp: number;
  rule: string;
  seq: number;
  hide: number;
}
