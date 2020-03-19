import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ConfirmDialogComponent, IDialog } from 'pastanaga-angular';

@Component({
    selector: `pa-confirm-delete`,
    template: `
        <pa-confirm-dialog>
            <pa-confirm-title><strong>Delete</strong> my account?</pa-confirm-title>
            <pa-confirm-description>Deleting your account is irreversible, all data it contains will be lost</pa-confirm-description>
            <pa-confirm-actions>
                <pa-button id="pa-confirm-cancel-button"
                           icon="clear"
                           color="secondary"
                           size="large"
                           paTooltip="pastanaga.cancel"
                           paTooltipType="action"
                           (click)="close(false)">
                    {{'pastanaga.cancel' | translate}}
                </pa-button>
                <pa-button id="pa-confirm-delete-button"
                           border
                           icon="delete"
                           color="destructive"
                           size="large"
                           paTooltip="pastanaga.delete"
                           paTooltipType="action"
                           (click)="close(true)">
                    {{'pastanaga.delete' | translate}}
                </pa-button>
            </pa-confirm-actions>
        </pa-confirm-dialog>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteDialogComponent implements IDialog {
    @ViewChild(ConfirmDialogComponent, {static: true}) dialog: ConfirmDialogComponent | undefined;

    close(confirmed: boolean) {
        if (!!this.dialog) {
            this.dialog.close(confirmed);
        }
    }
}
