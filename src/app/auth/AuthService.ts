import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  resourceUrl = "";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(
    protected http: HttpClient,
    protected router: Router,
    protected jwtHelper: JwtHelperService
  ) { }
}
