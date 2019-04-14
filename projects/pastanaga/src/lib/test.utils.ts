import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { SvgLoader } from 'angular-svg-icon';

export class FakeTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of({});
    }
}

export class FakeSvgLoader implements SvgLoader {
    getSvg(url: string): Observable<string> {
        return of('<svg></svg>');
    }
}

export function svgLoaderFactory() {
    return new FakeSvgLoader();
}
