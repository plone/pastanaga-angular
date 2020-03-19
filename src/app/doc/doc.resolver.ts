import { Resolver } from 'angular-traversal';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DocResolver extends Resolver {
    resolve(path: string, view: string, queryString?: string): Observable<any> {
        return of({path, view});
    }
}
