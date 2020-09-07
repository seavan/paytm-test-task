import { observable, runInAction } from 'mobx';

export class CurrencyConverter {
  @observable base = '';
  @observable date = '';
  @observable currencies: string[] = [];
  rates = new Map<string, number>();

  async load(): Promise<void> {
    const result = await (await fetch('https://api.exchangeratesapi.io/latest?base=CAD')).json();
    runInAction(() => {
      this.base = result.base;
      this.date = result.date;
      this.currencies = Object.keys(result.rates);
      this.currencies.forEach(currency => {
        this.rates.set(currency, parseFloat(result.rates[currency]));
      });
    });
  }

  convert(amount: number, currency: string): number {
    const coeff = this.rates.get(currency);
    if (coeff === undefined) throw new Error('Could not determine currency');
    return amount * coeff;
  }
}
