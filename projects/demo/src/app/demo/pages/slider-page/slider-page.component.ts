import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-slider-page',
    templateUrl: './slider-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderPageComponent {
    code = `<pa-slider></pa-slider>`;
}
