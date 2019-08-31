import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IncomeExpenses, IncomeExpensesModel } from "./income-expenses.model";
import { IncomeExpensesService } from "./income-expenses.service";

@Component({
  selector: "app-income-expenses",
  templateUrl: "./income-expenses.component.html",
  styles: []
})
export class IncomeExpensesComponent implements OnInit {
  incomeExpensesForm: FormGroup;
  constructor(private inExService: IncomeExpensesService) {}

  ngOnInit() {
    this.incomeExpensesForm = new FormGroup({
      description: new FormControl("", Validators.required),
      amount: new FormControl(1, Validators.required),
      type: new FormControl("Income", Validators.required)
    });
  }
  addIncomeOrExpense() {
    const incomeExpenses = new IncomeExpensesModel(
      this.incomeExpensesForm.value
    );
    this.inExService.createIncomeExpense(incomeExpenses);
    this.incomeExpensesForm.reset({ amount: 1 });
  }
}
