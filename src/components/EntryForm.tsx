import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { ChangeEvent } from 'react';
import { CurrencyConverter } from './CurrencyConverter';
import { IReceipt } from './global';
@observer
export class EntryForm extends React.Component<{
  converter: CurrencyConverter;
  onAddReceipt: (receipt: IReceipt) => void;
}> {
  @observable description = '';
  @observable amount = 0;
  @observable currency = 'CAD';

  @action.bound reset(): void {
    this.description = '';
    this.amount = 0;
    this.currency = 'CAD';
  }

  @action.bound handleAddItem(): void {
    const { description, amount, currency } = this;
    const cadAmount = this.props.converter.convert(amount, currency);
    this.props.onAddReceipt({ description, amount, currency, cadAmount });
    this.reset();
  }

  @action.bound handleChangeDescription(event: ChangeEvent<HTMLInputElement>): void {
    this.description = event.target.value;
  }

  @action.bound handleChangeAmount(event: ChangeEvent<HTMLInputElement>): void {
    try {
      this.amount = parseFloat(event.target.value);
    } catch (e) {
      console.error('Bad number format');
    }
  }

  @action.bound handleChangeCurrency(event: ChangeEvent<HTMLSelectElement>): void {
    this.currency = event.target.value;
  }

  get isValid(): boolean {
    return !!(this.description && this.amount > 0);
  }

  renderCurrency = (currency: string) => (
    <option label={currency} value={currency} key={currency}></option>
  );

  public render(): React.ReactNode {
    return (
      <form>
        <input
          type="text"
          value={this.description}
          onChange={this.handleChangeDescription}
          placeholder="Enter description..."
        />
        <input
          type="text"
          value={this.amount}
          onChange={this.handleChangeAmount}
          placeholder="Enter amount..."
        />
        <label htmlFor="currency">Currency:</label>
        <select name="currency" value={this.currency} onChange={this.handleChangeCurrency}>
          {this.props.converter.currencies.map(this.renderCurrency)}
        </select>
        <input disabled={!this.isValid} type="button" value="Add" onClick={this.handleAddItem} />
      </form>
    );
  }
}
