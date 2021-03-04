import { ChangeDetectorRef, Component } from '@angular/core';
import { avatar } from '../../demo.component';
import { AvatarModel, detectChanges } from '../../../../../../pastanaga-angular/src';

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

    code = `<pa-chip-closeable>A chip</pa-chip-closeable>
<pa-chip-closeable [avatar]="avatar">A chip with avatar</pa-chip-closeable>`;

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
}
