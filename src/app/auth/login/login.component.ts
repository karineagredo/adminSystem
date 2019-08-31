import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IncomeExpensesService } from "src/app/income-expenses/income-expenses.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ui")
      .subscribe(state => (this.isLoading = state.isLoading));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(data: any) {
    this.authService.login(data.email, data.password);
  }
}
