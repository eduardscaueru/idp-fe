import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./user.model";
import * as dayjs from "dayjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  resourceUrl = 'http://localhost:8083/api/user';

  constructor(
    private http: HttpClient
  ) {}

  getUser(id: number) {
    return this.http.get(this.resourceUrl + "/" + id, { observe: 'response' })
      .pipe(map((res: any) => this.convertDateFromServer(res)));
  }

  save(user: IUser) {
    return this.http.patch(this.resourceUrl + "/" + user.id!, user, { observe: 'response' })
      .pipe(map((res: any) => this.convertDateFromServer(res)));
  }

  getImageUser(id: number) {
    return this.http.get(this.resourceUrl + "/image/" + id, { observe: 'response' });
  }

  protected convertDateFromClient(user: IUser) {
    return Object.assign({}, user, {
      birthDate: user.birthDate ? JSON.stringify(user.birthDate) : undefined,
    });
  }

  protected convertDateFromServer(res: any) {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? dayjs(res.body.birthDate).format('YYYY-MM-DD') : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: any) {
    if (res.body) {
      res.body.forEach((user: IUser) => {
        user.birthDate = user.birthDate ? dayjs(user.birthDate) : undefined;
      });
    }
    return res;
  }
}
