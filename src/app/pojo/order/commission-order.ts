export class CommissionOrder {
  // orderStatus
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
