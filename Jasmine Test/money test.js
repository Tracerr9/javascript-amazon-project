import {formatCurrency} from '../script/utility/money.js';

describe('test suite: formatCurrency', () => {
  it('convert cents to dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0.00',() => {
    expect(formatCurrency(0)).toEqual('0.00');
  })

  it('round up', () => {
    expect(formatCurrency(2095.5)).toEqual('20.96');
  })
});