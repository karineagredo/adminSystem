import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";
import { User } from "./user.model";
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";
import {
  ActivateLoadingAction,
  DeactivateLoadingAction
} from "../shared/ui.actions";
import { SetUserAction } from "./auth.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userSubscription: Subscription;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private angularDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  public initAuthListener() {
    this.angularFireAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.userSubscription = this.angularDB
          .doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((objUser: any) => {
            const newUser = new User(objUser);
            this.store.dispatch(new SetUserAction(newUser));
          });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }

  public createUser(name: string, email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());

    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const user: User = {
          name: name,
          email: res.user.email,
          uid: res.user.uid
        };
        this.angularDB
          .doc(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this.router.navigate(["/"]);
          });
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(error => {
        Swal.fire("User could not be registered", error.message, "error");
        this.store.dispatch(new DeactivateLoadingAction());
      });
  }

  public login(email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(["/"]);
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(error => {
        Swal.fire("Login failed", error.message, "error");
        this.store.dispatch(new DeactivateLoadingAction());
      });
  }
  public logout() {
    this.router.navigate(["/login"]);
    this.angularFireAuth.auth.signOut();
  }
  public isAuth() {
    return this.angularFireAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(["/login"]);
        }
        return fbUser !== null;
      })
    );
  }
}
