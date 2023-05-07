import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {Environment} from "../../environments/env";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  resourceUrl = Environment.POST_URL;

  constructor(
    public http: HttpClient
  ) { }

  like(post: Post) {
    return this.http.patch(this.resourceUrl + '/' + post.id, { observe: 'response' });
  }

  unlike(post: Post) {
    return this.http.patch(this.resourceUrl + '/' + post.id + '/unlike', { observe: 'response' });
  }

  createPost(title: string, body: string, groupId: number) {
    return this.http.post(this.resourceUrl + '/' + groupId, {title, body}, { observe: 'response' })
  }
}
