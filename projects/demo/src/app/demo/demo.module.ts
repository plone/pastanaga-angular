import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page/demo-page.component';
import {
    DemoCodeDirective,
    DemoDescriptionDirective,
    DemoExamplesDirective,
    DemoTitleDirective,
    DemoUsageDirective
} from './demo.directives';
import { DemoMenuComponent } from './demo-menu/demo-menu.component';
import { TraversalModule } from 'angular-traversal';

const COMPONENTS = [
    DemoPageComponent,
    DemoMenuComponent,
    DemoTitleDirective,
    DemoDescriptionDirective,
    DemoExamplesDirective,
    DemoUsageDirective,
    DemoCodeDirective,
];

@NgModule({
    imports: [
        CommonModule,
        TraversalModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDemoModule {
}
