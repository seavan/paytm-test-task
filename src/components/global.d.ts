export interface IReceipt {
  description: string;
  amount: number;
  currency: string;
  cadAmount: number;
}

export interface IKeyedReceipt extends IReceipt {
  id: number;
}
