import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/env";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  resourceUrl = environment.GROUP_URL;

  constructor(protected http: HttpClient) {}

  getGroups() {
    return this.http.get(this.resourceUrl, { observe: "response" });
  }

  getGroup(id: number) {
    return this.http.get(this.resourceUrl + "/" + id, { observe: "response" });
  }

  getGroupsUserNotIn(id: number) {
    return this.http.get(this.resourceUrl + "/userNotIn/" + id);
  }

  requestJoin(id: number) {
    return this.http.post(this.resourceUrl + '/' + id + '/join', null, { observe: "response" });
  }

  getGroupsUserIn(id: number) {
    return this.http.get(this.resourceUrl + "/userIn/" + id, { observe: "response" });
  }

  getGroupFeed(groupId: number, lastIndex: number) {
    return this.http.get(this.resourceUrl + "/" + groupId + "/posts/" + lastIndex, {observe: "response"});
  }
}
