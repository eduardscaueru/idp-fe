import { Component } from '@angular/core';
import {AuthService} from "../AuthService";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [],
    password: []
  })

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  login(): void {
    this.authService.login(this.loginForm.value!).subscribe();
  }
}
