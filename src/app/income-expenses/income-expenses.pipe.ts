import { Pipe, PipeTransform } from "@angular/core";
import { IncomeExpensesModel } from "./income-expenses.model";

@Pipe({
  name: "incomeExpenses"
})
export class IncomeExpensesPipe implements PipeTransform {
  transform(items: IncomeExpensesModel[]): IncomeExpensesModel[] {
    return items.sort(a => {
      if (a.type === "INCOME") {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
