import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastanagaProgressComponent } from './progress.component';
import { PastanagaSpinnerComponent } from './spinner.component';
import { PastanagaProgressCircleComponent } from './progress-circle.component';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENT_LIST = [PastanagaProgressComponent, PastanagaSpinnerComponent, PastanagaProgressCircleComponent];

@NgModule({
    imports: [CommonModule, TranslateModule],
    exports: COMPONENT_LIST,
    declarations: COMPONENT_LIST,
})
export class ProgressModule {}
