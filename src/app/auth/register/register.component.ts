import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ui")
      .pipe(filter(ui => ui.isLoading))
      .subscribe(ui => (this.isLoading = ui.isLoading));
  }
  // this.subscription = this.store
  //   .select("ui")
  //   .subscribe(ui => console.log(ui));
  // }

  submit(data: any) {
    this.authService.createUser(data.name, data.email, data.password);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
