import { Component, OnInit } from '@angular/core';
import {IGroup} from "../group.model";
import {GroupService} from "../group.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../auth/AuthService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IUser} from "../../user/user.model";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../post/post.model";
import {PostService} from "../../post/post.service";

@Component({
  selector: 'app-mygroup',
  templateUrl: './mygroup.component.html',
  styleUrls: ['./mygroup.component.scss']
})
export class MygroupComponent implements OnInit {

  group: IGroup = {} as IGroup;
  pendingUsers: IUser[] | undefined;
  moderator: boolean | undefined;
  postForm = this.fb.group({
    'title': new FormControl(),
    'bodyText': new FormControl(),
  });

  constructor(
    protected groupService: GroupService,
    protected userService: UserService,
    protected jwtHelper: JwtHelperService,
    public authService: AuthService,
    protected modalService: NgbModal,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.groupService.getGroup(id).subscribe((res: any) => {
      this.group = res.body;
      this.moderator = true;
    })
  }

  openModal(modalContent: any): void {
    this.modalService.open(modalContent, {
      animation: true,
      scrollable: true,
      centered: true,
      size: 'sm'
    });
  }

  openModalForPost(modalContent: any): void {
    this.modalService.open(modalContent, {
      animation: true,
      scrollable: true,
      centered: true,
      size: 'xl'
    });
  }

  createPost(groupId: number, modal: any) {
    this.openModalForPost(modal)
  }

  post(groupId: number) {
    const title = this.postForm.get(['title'])?.value;
    const bodyText = this.postForm.get(['bodyText'])?.value;
    this.postService.createPost(title, bodyText, groupId).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.router.navigate(['/mygroup/' + groupId]);
    });
  }
}
