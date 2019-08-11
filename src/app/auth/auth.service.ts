import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private angularDB: AngularFirestore
  ) {}

  public initAuthListener() {
    this.angularFireAuth.authState.subscribe(fbUser => {
      console.log(fbUser);
    });
  }

  public createUser(name: string, email: string, password: string) {
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
      })
      .catch(error => {
        Swal.fire("User could not be registered", error.message, "error");
      });
  }

  public login(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(["/"]);
      })
      .catch(error => {
        Swal.fire("Login failed", error.message, "error");
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
