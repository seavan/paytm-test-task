import { action, observable, computed } from 'mobx';
import { IKeyedReceipt, IReceipt } from './global';

export class Store {
  @observable receipts: IKeyedReceipt[] = [];
  lastReceiptId = 1;

  @action.bound deleteReceipt(receipt: IKeyedReceipt): void {
    this.receipts = this.receipts.filter(r => r.id !== receipt.id);
  }

  @action.bound addReceipt(receipt: IReceipt): void {
    const keyedReceipt = { ...receipt, id: this.lastReceiptId++ };
    this.receipts.push(keyedReceipt);
  }

  @computed get totalCad(): number {
    return this.receipts
      .map(r => r.cadAmount)
      .reduce((prev: number, current: number) => prev + current, 0);
  }
}
