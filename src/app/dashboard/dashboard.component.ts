import { Component, OnInit } from "@angular/core";
import { IncomeExpensesService } from "../income-expenses/income-expenses.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private incomeExpenseService: IncomeExpensesService) {}

  ngOnInit() {
    this.incomeExpenseService.initIncomeExpenseListener();
  }
}
