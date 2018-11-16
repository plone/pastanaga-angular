import { Observable } from 'rxjs';
import { Renderer2 } from '@angular/core';

export interface SvgLoaderInterface {
    loadSvgFromSsr(iconPath: string, renderer: Renderer2): Observable<SVGElement>;
}
