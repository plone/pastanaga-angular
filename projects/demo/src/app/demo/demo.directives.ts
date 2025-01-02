import { Directive } from '@angular/core';

@Directive({
  selector: 'pa-demo-title',
  standalone: false,
})
export class DemoTitleDirective {}

@Directive({
  selector: 'pa-demo-description',
  standalone: false,
})
export class DemoDescriptionDirective {}

@Directive({
  selector: 'pa-demo-examples',
  standalone: false,
})
export class DemoExamplesDirective {}

@Directive({
  selector: 'pa-demo-configuration',
  standalone: false,
})
export class DemoConfigurationDirective {}

@Directive({
  selector: 'pa-demo-usage',
  standalone: false,
})
export class DemoUsageDirective {}

@Directive({
  selector: 'pa-demo-code',
  standalone: false,
})
export class DemoCodeDirective {}
