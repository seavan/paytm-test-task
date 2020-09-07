import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import App from '../src/components/App';

it('App is rendered', () => {
  TestUtils.renderIntoDocument(<App />);
  const appNode = document.querySelector('.app');
  expect(appNode).toBeDefined();
});
