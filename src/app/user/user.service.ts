import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) {}

    resourceUrl = 'http://localhost:8083/api/user';

    getFeed(lastIndex: number) {
        return this.http.get(this.resourceUrl + "/feed/" + lastIndex, { observe: "response" });
    }
}