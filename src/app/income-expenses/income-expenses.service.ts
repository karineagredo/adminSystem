import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IncomeExpensesModel } from "./income-expenses.model";
import { AuthService } from "../auth/auth.service";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { filter, map } from "rxjs/operators";
import { setItemsAction } from "./income-expenses.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IncomeExpensesService {
  private storeSubscription: Subscription;
  private itemsSubscription: Subscription;
  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  initIncomeExpenseListener() {
    this.storeSubscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => this.findCollection(auth.user.uid));
  }

  private findCollection(uid: string) {
    this.itemsSubscription = this.afDB
      .collection(`${uid}/income-expenses/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            console.log(doc);
            return {
              ...doc.payload.doc.data(),
              uid: doc.payload.doc.id
            };
          });
        })
      )

      .subscribe((collection: any) => {
        this.store.dispatch(new setItemsAction(collection));
      });
  }

  cancelSubscriptions() {
    this.storeSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }
  createIncomeExpense(incomeExpense: IncomeExpensesModel) {
    const user = this.authService.getUser();
    this.afDB
      .doc(`${user.uid}/income-expenses`)
      .collection("items")
      .add({ ...incomeExpense })
      .then(() => {
        Swal.fire(
          "data saved successfully",
          incomeExpense.description,
          "success"
        );
      })
      .catch(error => {
        console.log(error);
        Swal.fire("Data couldn't be saved", error.message, "error");
      });
  }
}
