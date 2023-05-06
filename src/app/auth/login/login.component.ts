import { Component, OnInit } from '@angular/core';
import {AuthService} from "../AuthService";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [],
    password: []
  })

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // if (this.authService.isLogged()) {
    //   this.router.navigate(['/groups']);
    // }
  }

  login(): void {
    this.authService.login(this.loginForm.value!).subscribe();
  }
}
