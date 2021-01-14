import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-input-standalone-example',
    templateUrl: './input-standalone-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputStandaloneExampleComponent {
    value?: any;

    updateChangeEvent?: any;
    updateStatusEvent?: any;
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;

    config?: any = {};

    updateConfig(config: any) {
        if (config.value !== this.config.value) {
            this.value = config.value;
        }
        this.config = config;
    }
}
