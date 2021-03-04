import { ChangeDetectorRef, Component } from '@angular/core';
import { avatar } from '../../demo.component';
import { AvatarModel, detectChanges, IconModel } from '../../../../../../pastanaga-angular/src';

@Component({
    selector: 'pa-demo-chip-page',
    templateUrl: './chip-page.component.html',
    styleUrls: ['./chip-page.component.scss'],
})
export class ChipPageComponent {
    createdCount = 0;
    first = true;
    second = true;
    third = true;

    readonly avatarWithImage: AvatarModel = {
        userName: 'Amanda',
        image: avatar,
    };

    readonly icon: IconModel = {
        path: 'assets/ninja.svg',
        color: '#2597f4',
    };

    selection?: number;

    code = `<pa-chip-closeable noCloseButton>Not closable chip</pa-chip-closeable>
<pa-chip-closeable (closed)="close('chip2')">Closeable chip</pa-chip-closeable>
<pa-chip-closeable [avatar]="avatar" (closed)="close('chip1')">Closeable chip with avatar</pa-chip-closeable>
`;
    codeSelection = `<pa-chip-selectionable [selected]="selection === 1" (select)="onSelect(1)">Selectionable chip</pa-chip-selectionable>
<pa-chip-selectionable [selected]="selection === 2" (select)="onSelect(2)" disabled>Disabled chip</pa-chip-selectionable>
<pa-chip-selectionable [selected]="selection === 3" (select)="onSelect(3)" [icon]="icon">Icon chip</pa-chip-selectionable>`;

    constructor(private cdr: ChangeDetectorRef) {}

    close(item: string) {
        switch (item) {
            case 'first':
                this.first = false;
                break;
            case 'second':
                this.second = false;
                break;
            default:
                this.third = false;
                break;
        }
        detectChanges(this.cdr);
    }

    reload() {
        this.first = true;
        this.second = true;
        this.third = true;
    }

    onSelect(id: number) {
        if (this.selection !== id) {
            this.selection = id;
        } else {
            this.selection = undefined;
        }
    }
}
