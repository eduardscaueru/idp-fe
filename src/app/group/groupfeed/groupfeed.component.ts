import {Component, HostListener, Input, OnInit} from '@angular/core';
import {GroupService} from "../group.service";
import {Post} from "../../post/post.model";
import {PostService} from "../../post/post.service";
import {HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-groupfeed',
  templateUrl: './groupfeed.component.html',
  styleUrls: ['./groupfeed.component.scss'],
})
export class GroupfeedComponent implements OnInit {
  posts!: Post[];
  done!: boolean;
  busy!: boolean;
  @Input() groupId!: number;

  isShown: boolean = true;

  constructor(
    private groupService: GroupService,
    private postService: PostService,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.groupId = Number(this.route.snapshot.url[1]["path"]);

    this.groupService.getGroupFeed(this.groupId, 0).subscribe((res: any) => {
      console.log(res.body);
      this.posts = res.body;
      this.done = this.posts.length < 10;
    });
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

        let lastIndex = this.posts[this.posts.length - 1].id;

        this.groupService.getGroupFeed(this.groupId, lastIndex!).subscribe((res: any) => {
          let newPosts: Post[] = res.body;
          this.posts = this.posts.concat(newPosts);
          this.done = newPosts.length < 10;

          this.busy = false;
        });
      }
    }
  }

}
