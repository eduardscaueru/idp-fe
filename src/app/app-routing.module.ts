import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {PostComponent} from "./post/post.component";
import {AuthGuard} from "./util/auth.guard";
import {DiscoverComponent} from "./group/discover/discover.component";
import {GroupResolver} from "./group/group.resolver";
import {GroupComponent} from "./group/group/group.component";
import { GroupfeedComponent } from './group/groupfeed/groupfeed.component';
import {MygroupComponent} from "./group/mygroup/mygroup.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "discover",
    component: DiscoverComponent,
    resolve: {
      user: GroupResolver
    }
  },
  {
    path: "groups",
    component: GroupComponent,
    resolve: {
      user: GroupResolver
    }
  },
  {
    path: "mygroup/:id",
    component: MygroupComponent,
    resolve: {
      user: GroupResolver
    }
  },
  {
    path: "post",
    component: PostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "feed",
    component: GroupfeedComponent,
    resolve: {
      user: GroupResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
