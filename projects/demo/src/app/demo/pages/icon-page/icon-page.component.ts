import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// @ts-ignore
import ICON_LIST from '../../../../assets/glyphs.json';
import { BaseIconPageComponent } from './base-icon-page.component';

@Component({
    templateUrl: './icon-page.component.html',
    styleUrls: ['./icon-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPageComponent extends BaseIconPageComponent implements OnInit {

    ngOnInit(): void {
        this.icons = ICON_LIST;
    }

}
