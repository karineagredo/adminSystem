export class IncomeExpensesModel {
  description: string;
  amount: number;
  type: IncomeExpenses;
  uid?: string;

  constructor(obj: IncomeExpensesObj) {
    this.description = (obj && obj.description) || null;
    this.amount = (obj && obj.amount) || null;
    this.uid = (obj && obj.uid) || null;
    this.type = (obj && obj.type) || null;
  }
}

export type IncomeExpenses = "INCOME" | "EXPENSES";

interface IncomeExpensesObj {
  description: string;
  amount: number;
  uid?: string;
  type: IncomeExpenses;
}
