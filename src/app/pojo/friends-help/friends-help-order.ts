export interface FriendsHelpOrder {
  id: string;
  orderType: number;
  orderStatus: number;
  name: string;
  orderTel: string;
  orderPrice: number;
  addTimeStr: string;
  endTimestamp: number;
  countdown?: string;
}

export class FriendsHelpOrderConstant {

  // orderType
  public static readonly GOODS_ORDER = 1;
  public static readonly ACTIVITY_ORDER = 2;


  // orderStatus
  /**
   *  已取消
   */
  public static readonly ORDER_HAS_BEEN_CANCELED = -1;
  /**
   * 未支付
   */
  public static readonly ORDER_NOT_PAID = 0;
  /**
   * 已下单（已支付）
   */
  public static readonly ORDER_HAS_BEEN_PLACE = 1;
  /**
   *  结算成功
   */
  public static readonly ORDER_HAS_BEEN_SETTLED_SUCCESSFULLY = 2;
  /**
   *  已关闭（退款）
   */
  public static readonly ORDER_HAS_BEEN_CLOSED = 3;
  /**
   *  已维权（退款）
   */
  public static readonly ORDER_HAS_BEEN_REFUND = 4;
}
