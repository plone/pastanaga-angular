import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { detectChanges } from '../../../../../../../pastanaga-angular/src';

@Component({
    selector: 'pa-demo-input-ng-model-example',
    templateUrl: './input-ng-model-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNgModelExampleComponent {
    model?: any;

    updateChangeEvent?: any;
    updateStatusEvent?: any;
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;
    ngModelChangeEvent?: any;

    config?: any = {};

    constructor(private cdr: ChangeDetectorRef) {}

    updateConfig(config: any) {
        if (config.value !== this.config.value) {
            this.model = config.value;
            detectChanges(this.cdr);
        }
        this.config = config;
    }
}
