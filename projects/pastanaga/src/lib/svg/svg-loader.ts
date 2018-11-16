import { Observable, of } from 'rxjs';
import { SvgLoaderInterface } from './svg-loader.interface';
import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class SvgLoader implements SvgLoaderInterface {
    loadSvgFromSsr(iconPath: string, renderer: Renderer2): Observable<SVGElement> {
        return of(null);
    }
}
