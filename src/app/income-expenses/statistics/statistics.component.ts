import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { IncomeExpensesModel } from "../income-expenses.model";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"]
})
export class StatisticsComponent implements OnInit {
  income: number;
  expenses: number;
  totalIncome: number;
  totalExpenses: number;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select("incomeExpense").subscribe(incomeExpenses => {
      this.calculateIncomeExpenses(incomeExpenses.items);
    });
  }
  calculateIncomeExpenses(items: IncomeExpensesModel[]) {
    this.income = 0;
    this.totalExpenses = 0;
    this.expenses = 0;
    this.totalIncome = 0;
    items.forEach(value => {
      if (value.type === "EXPENSES") {
        this.totalExpenses += value.amount;
      } else {
        this.totalIncome += value.amount;
      }
    });
  }
}
