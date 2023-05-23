import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../auth/AuthService";
import {IPost, Post} from "../post/post.model";
import {PostService} from "../post/post.service";
import {HttpStatusCode} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {GroupService} from "../group/group.service";
import {Group, IGroup} from "../group/group.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    posts!: Post[];
    done!: boolean;
    busy: boolean = false;

    commentText!: string;

    constructor(
      protected postService: PostService,
      protected authService: AuthService,
      protected jwtHelper: JwtHelperService,
      protected groupService: GroupService
    ) { }

    ngOnInit(): void {
      this.posts = [];
      const encodedToken = localStorage.getItem("token");
      const token = this.jwtHelper.decodeToken(encodedToken!);
      const id = token.userId;
      var groupsUserIn: Group[] = [];
      this.groupService.getGroupsUserIn(id).subscribe((res: any) => {
        groupsUserIn = res.body;
        groupsUserIn.forEach((group) => {
          console.log(group);
          this.groupService.getGroupFeed(group.id!, -1).subscribe((res: any) => {
            let newPosts: Post[] = res.body;
            this.posts = this.posts.concat(newPosts);
          });
        });
        this.done = this.posts.length < 10;
      });
    }

    isLoggedIn(): boolean {
      return this.authService.isLogged();
    }


    likePost(post: Post): void {
      if (post.alreadyLiked) {
        return;
      }

      this.postService.like(post).subscribe(() => {
        post.likeCount!++;
        post.alreadyLiked = true;
      });
    }

    unlikePost(post: Post): void {
      if (!post.alreadyLiked) {
        return;
      }

      this.postService.unlike(post).subscribe(() => {
        post.likeCount!--;
        post.alreadyLiked = false;
      })
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
      if (!this.done && !this.busy) {
        const triggerAt: number = 128;

        if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= triggerAt) {
          this.busy = true;

          let lastIndex = this.posts[this.posts.length - 1].id as number;
          const encodedToken = localStorage.getItem("token");
          const token = this.jwtHelper.decodeToken(encodedToken!);
          const id = token.userId;
          var groupsUserIn: Group[] = [];
          this.groupService.getGroupsUserIn(id).subscribe((res: any) => {
            groupsUserIn = res.body;
            groupsUserIn.forEach((group) => {
              console.log(group);
              this.groupService.getGroupFeed(group.id!, lastIndex).subscribe((res: any) => {
                let newPosts: Post[] = res.body;
                this.posts = this.posts.concat(newPosts);

                this.done = newPosts.length < 10;

                this.busy = false;
              });
            });
          });

        }
      }
    }
}
