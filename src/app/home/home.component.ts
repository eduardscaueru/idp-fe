import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/AuthService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    protected authService: AuthService,
  ) {}

  ngOnInit(): void { }

  isLoggedIn(): boolean {
    return this.authService.isLogged();
  }
}
