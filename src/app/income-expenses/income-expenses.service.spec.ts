import { TestBed } from '@angular/core/testing';

import { IncomeExpensesService } from './income-expenses.service';

describe('IncomeExpensesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncomeExpensesService = TestBed.get(IncomeExpensesService);
    expect(service).toBeTruthy();
  });
});
