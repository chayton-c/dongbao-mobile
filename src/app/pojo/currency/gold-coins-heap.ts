export class GoldCoinsHeap {
  id?: number;
  customerId?: number;
  amount?: number;
  addTime?: Date;
  updateTime?: Date;
  left: number = 0;
  top: number = 0;
  receivedStatus: number = new GoldCoinsHeapConstant().NORMAL;
}

export class GoldCoinsHeapConstant {
  public readonly NORMAL = 0;
  public readonly RECEIVED = 1;
}
