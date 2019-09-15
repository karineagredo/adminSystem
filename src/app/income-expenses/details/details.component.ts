import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { IncomeExpensesModel } from "../income-expenses.model";
import { interval, timer, Subscription } from "rxjs";
import { IncomeExpensesService } from "../income-expenses.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit, OnDestroy {
  public items: IncomeExpensesModel[];
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private incomeExpensesService: IncomeExpensesService
  ) {}

  ngOnInit() {
    this.subscription = this.store.select("incomeExpense").subscribe(data => {
      this.items = data.items;
    });
  }

  deleteItem(uid: string) {
    this.incomeExpensesService.deleteItem(uid).then(() => {
      Swal.fire("success", "item deleted successfully", "success");
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
