import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { IKeyedReceipt } from './IKeyedReceipt';
import { roundCurrency } from './roundCurrency';
@observer
export class ReceiptRow extends React.Component<{
  receipt: IKeyedReceipt;
  onDelete: (receipt: IKeyedReceipt) => void;
}> {
  @action.bound handleDelete() {
    if (confirm('Are you sure you want to delete this item?')) {
      this.props.onDelete(this.props.receipt);
    }
  }

  public render() {
    const { receipt } = this.props;
    const { description, amount, currency, cadAmount } = receipt;
    return (
      <tr>
        <td>{description}</td>
        <td>{amount}</td>
        <td>{currency}</td>
        <td>{roundCurrency(cadAmount)}</td>
        <td>
          <input type="button" value="Delete" onClick={this.handleDelete} />
        </td>
      </tr>
    );
  }
}
