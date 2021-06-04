import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Data } from '../scroll-page.service';

@Component({
    selector: 'pa-demo-data-card',
    templateUrl: './data-card.component.html',
    styleUrls: ['./data-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCardComponent {
    @Input() data?: Data;
}
