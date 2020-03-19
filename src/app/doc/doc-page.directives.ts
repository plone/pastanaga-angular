import { Directive } from '@angular/core';

@Directive({ selector: 'pa-doc-page-title' })
export class DocPageTitleDirective {}

@Directive({ selector: 'pa-doc-page-description' })
export class DocPageDescriptionDirective {}

@Directive({ selector: 'pa-doc-page-examples' })
export class DocPageExamplesDirective {}

@Directive({ selector: 'pa-doc-page-usage' })
export class DocPageUsageDirective {}

@Directive({ selector: 'pa-doc-page-code' })
export class DocPageCodeDirective {}
