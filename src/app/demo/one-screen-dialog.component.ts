import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlModel, DialogComponent, IDialog } from 'pastanaga-angular';

@Component({
    selector: 'some-content',
    template: `<pa-dialog>
    <pa-dialog-title>Preferences</pa-dialog-title>
    <pa-dialog-image>
        <img src="assets/icons/cog.svg">
    </pa-dialog-image>

    <pa-checkbox-group [checkboxes]="simpleCheckboxes"
                       (selection)="onChange($event)">Search results</pa-checkbox-group>

    <pa-dialog-footer>
        <pa-button color="secondary" (click)="close()">Cancel</pa-button>
        <pa-button border (click)="close()">Save</pa-button>
    </pa-dialog-footer>
</pa-dialog>
`
})

export class OneScreenDialogComponent implements IDialog, OnInit {
    @ViewChild(DialogComponent, { static: true }) dialog: DialogComponent | undefined;

    step = 0;
    simpleCheckboxes: ControlModel[] = [
        new ControlModel({id: 'check1', label: 'Show embedded files from Office documents', value: 'simple_1'}),
        new ControlModel({id: 'check2', label: 'Show embedded files from Quip documents', value: 'simple_2'}),
        new ControlModel({id: 'check3', label: 'Show search duplicates in results view', value: 'simple_3', isSelected: true}),
    ];

    ngOnInit() {
        if (!!this.dialog) {
            this.dialog.onEnter = this.close.bind(this);
        }
    }

    close() {
        if (!!this.dialog) {
            this.dialog.close({edition: true});
        }
    }

    onChange($event) {
        console.log($event);
    }
}
