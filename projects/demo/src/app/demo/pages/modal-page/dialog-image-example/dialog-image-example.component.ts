import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DialogComponent, IModal } from '../../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './dialog-image-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogImageExampleComponent implements IModal {
    @ViewChild(DialogComponent, { static: true }) modal: DialogComponent | undefined;
}
