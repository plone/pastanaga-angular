import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-doc-component',
    templateUrl: './doc.component.html',
    styleUrls: ['./doc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocComponent {}
