import { action, observable, computed } from 'mobx';
import { IReceipt } from './IReceipt';
import { IKeyedReceipt } from './IKeyedReceipt';

export class Store {
  @observable receipts: IKeyedReceipt[] = [];
  lastReceiptId = 1;

  @action.bound deleteReceipt(receipt: IKeyedReceipt) {
    this.receipts = this.receipts.filter(r => r.id !== receipt.id);
  }

  @action.bound addReceipt(receipt: IReceipt) {
    const keyedReceipt = { ...receipt, id: this.lastReceiptId++ };
    this.receipts.push(keyedReceipt);
  }

  @computed get totalCad() {
    return this.receipts
      .map(r => r.cadAmount)
      .reduce((prev: number, current: number) => prev + current, 0);
  }
}
