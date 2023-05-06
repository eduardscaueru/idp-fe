import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Group, IGroup} from "./group.model";
import {GroupService} from "./group.service";
import {mergeMap} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupResolver implements Resolve<IGroup> {
  constructor(private service: GroupService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroup> | Observable<never> {
    const id = route.params['id'];
    console.log("edi");
    if (id) {
      return this.service.getGroup(id).pipe(
        mergeMap((group: HttpResponse<Group>) => {
          if (group.body) {
            return of(group.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new Group());
  }
}
