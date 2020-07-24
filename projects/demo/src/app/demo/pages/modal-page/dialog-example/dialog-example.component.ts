import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DialogComponent, IModal } from '../../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './dialog-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExampleComponent implements IModal {
    @ViewChild(DialogComponent, { static: true }) modal: DialogComponent | undefined;
}
