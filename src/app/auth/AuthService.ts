import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {first, tap} from "rxjs/operators";
import {IUser} from "../user/user.model";
import {environment} from "../../environments/env";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  resourceUrl = environment.AUTH_URL;
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(
    protected http: HttpClient,
    protected router: Router,
  ) { }

  login(user: IUser) {
    return this.http.post(this.resourceUrl + "/login", user, { observe: "response" })
      .pipe(
        first(),
        tap((res: any) => {
          this.isUserLoggedIn$.next(true);
          localStorage.setItem("token", res.body.token);
          localStorage.setItem("userId", res.body.userId);
          this.router.navigate(["/groups"]);
        })
      );
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  register(user: IUser) {
    return this.http.post(this.resourceUrl + "/register", user, { observe: "response" });
  }

  isLogged(): boolean {
    return !!localStorage.getItem("token");
  }
}
