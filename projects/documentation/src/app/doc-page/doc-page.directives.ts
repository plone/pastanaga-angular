import { Directive } from '@angular/core';

@Directive({
  selector: 'doc-title',
  standalone: false,
})
export class DocTitleDirective {
  constructor() {}
}

@Directive({
  selector: 'doc-description',
  standalone: false,
})
export class DocDescriptionDirective {
  constructor() {}
}
