import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICONS } from '../../../../assets/glyphs';
import { BaseIconPageComponent } from './base-icon-page.component';

@Component({
    templateUrl: './icon-page.component.html',
    styleUrls: ['./icon-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPageComponent extends BaseIconPageComponent implements OnInit {
    ngOnInit(): void {
        this.icons = ICONS.sort();
    }
}
