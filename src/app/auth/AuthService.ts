import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {first, tap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IUser} from "../user/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  resourceUrl = "localhost:8000";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(
    protected http: HttpClient,
    protected router: Router,
    protected jwtHelper: JwtHelperService
  ) { }

  login(user: IUser) {
    return this.http.post(this.resourceUrl + "/login", user, { observe: "response" })
      .pipe(
        first(),
        tap((res: any) => {
          this.isUserLoggedIn$.next(true);
          localStorage.setItem("token", res.body.token);
          this.router.navigate(["/"]);
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
