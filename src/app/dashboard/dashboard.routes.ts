import { Routes } from "@angular/router";
import { IncomeExpensesComponent } from "../income-expenses/income-expenses.component";
import { StatisticsComponent } from "../income-expenses/statistics/statistics.component";
import { DetailsComponent } from "../income-expenses/details/details.component";

export const dashboardRoutes: Routes = [
  { path: "income-expenses", component: IncomeExpensesComponent },
  { path: "", component: StatisticsComponent },
  { path: "details", component: DetailsComponent }
];
