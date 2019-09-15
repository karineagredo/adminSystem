import { IncomeExpensesPipe } from './income-expenses.pipe';

describe('IncomeExpensesPipe', () => {
  it('create an instance', () => {
    const pipe = new IncomeExpensesPipe();
    expect(pipe).toBeTruthy();
  });
});
