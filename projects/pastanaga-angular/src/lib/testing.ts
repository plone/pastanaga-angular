import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule, SvgLoader } from 'angular-svg-icon';
import { Observable, of } from 'rxjs';

@Injectable()
class SvgTestLoader implements SvgLoader {

    getSvg(url: string): Observable<string> {
        return of('');
    }
}

export const TESTING_IMPORTS = [
    BrowserModule,
    AngularSvgIconModule.forRoot(),
];

export const TESTING_PROVIDERS = [
    { provide: SvgLoader, useClass: SvgTestLoader },
];
