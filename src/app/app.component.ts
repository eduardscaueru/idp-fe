import { Component } from '@angular/core';
import {AuthService} from "./auth/AuthService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ipd-fe';

  public constructor(private authService: AuthService) {
  }

  isLoggedIn() {
    return this.authService.isLogged();
  }
}
