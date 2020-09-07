import 'regenerator-runtime/runtime.js';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { observer } from 'mobx-react';
import { action, observable, toJS } from 'mobx';

import './../assets/scss/App.scss';
import { IKeyedReceipt } from './IKeyedReceipt';
import { Store } from './Store';
import { CurrencyConverter } from './CurrencyConverter';
import { EntryForm } from './EntryForm';
import { ReceiptRow } from './ReceiptRow';
import { roundCurrency } from './roundCurrency';

@observer
class App extends React.Component {
  converter = new CurrencyConverter();
  store = new Store();

  @observable loading = true;

  async componentDidMount() {
    try {
      await this.converter.load();
    } catch (e) {
      alert('Could not load exchange rates');
    } finally {
      this.loading = false;
    }
  }

  renderReceipt = (receipt: IKeyedReceipt) => (
    <ReceiptRow key={receipt.id} receipt={receipt} onDelete={this.store.deleteReceipt} />
  );

  @action.bound handleSubmitExpenseReport() {
    console.log('===== EXPENSE REPORT');
    console.log(toJS(this.store.receipts));
  }

  public render() {
    return (
      <div className="app">
        {this.loading ? (
          <span>Loading</span>
        ) : (
          <>
            <h1>Paytm receipt task</h1>
            <h2>Add an item</h2>
            <EntryForm converter={this.converter} onAddReceipt={this.store.addReceipt} />
            <h2>Receipts:</h2>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Amount in CAD</th>
                </tr>
              </thead>
              <tbody>{this.store.receipts.map(this.renderReceipt)}</tbody>
            </table>
            <h2>Total amount (CAD):</h2>
            <h3>{roundCurrency(this.store.totalCad)}</h3>
            {this.store.totalCad > 1000 ? (
              <div>
                You have exceeded the limit of $1000 CAD for your expense report. Reconsider your
                behaviour!
              </div>
            ) : (
              <input
                disabled={this.store.receipts.length === 0}
                type="button"
                value="Submit expense report"
                onClick={this.handleSubmitExpenseReport}
              />
            )}
          </>
        )}
        <div>
          <br />
          <br />
          <small>Currency base: {this.converter.base}</small>
          <br />
          <small>Currency exchange rate date: {this.converter.date}</small>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
