import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "../user/user.service";
import {IUser} from "../user/user.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  id: number | undefined;
  profilePic: any;
  user: IUser | undefined;
  username: string | undefined;

  constructor(
    protected jwtHelper: JwtHelperService,
    protected userService: UserService,
  ) {}

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("token");
    const token = this.jwtHelper.decodeToken(encodedToken!);
    this.id = token.userId;
    this.userService.getUser(this.id!).subscribe((res: any) => {
      this.user = res.body;
      this.username = this.user!.username!;
    });
    this.userService.getImageUser(this.id!).subscribe((res: any) => {
      this.profilePic = res.body.img;
    })
  }
}
