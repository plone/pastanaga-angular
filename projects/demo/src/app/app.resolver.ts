import { Resolver } from 'angular-traversal';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppResolver extends Resolver {
    resolve(path: string, view: string, queryString?: string): Observable<any> {
        return of({path, view});
    }
}
