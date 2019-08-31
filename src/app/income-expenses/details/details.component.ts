import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { IncomeExpensesModel } from "../income-expenses.model";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  public items: IncomeExpensesModel[];
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select("incomeExpense").subscribe(data => {
      this.items = data.items;
      console.log(this.items);
    });
  }
}
