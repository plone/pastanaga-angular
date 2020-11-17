import { ChangeDetectorRef, Component } from '@angular/core';
import { avatar } from '../../demo.component';
import { markForCheck } from '../../../../../../pastanaga-angular/src';

@Component({
    selector: 'pa-demo-chip-page',
    templateUrl: './chip-page.component.html',
    styleUrls: ['./chip-page.component.scss'],
})
export class ChipPageComponent {
    createdCount = 0;
    chips: { name: string; contact?: { name: string; image?: any } }[] = [
        { name: 'Amanda Caballerot', contact: { name: 'Amanda', image: avatar } },
        { name: 'amanda@company.com' },
        { name: 'super long chip demonstrating max allowed width' },
    ];

    code = `<pa-chip>A chip</pa-chip>
        <pa-chip [contact]="myContactWithNameAndImage">Another chip</pa-chip>`;

    constructor(private cdr: ChangeDetectorRef) {}

    addChip() {
        this.createdCount++;
        this.chips = [...this.chips, { name: `new chip ${this.createdCount}` }];
    }

    addAvatarImageChip() {
        this.createdCount++;
        this.chips = [...this.chips, { name: `new chip ${this.createdCount}`, contact: { name: '', image: avatar } }];
    }

    addAvatarChip() {
        this.createdCount++;
        this.chips = [...this.chips, { name: `new chip ${this.createdCount}`, contact: { name: 'new chip' } }];
    }

    closeChip(name: string) {
        const index = this.chips.findIndex((chip: any) => chip.name === name);
        if (index > -1) {
            this.chips.splice(index, 1);
            markForCheck(this.cdr);
        }
    }
}
