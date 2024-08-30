import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
} from '@angular/core';
import { PaButtonModule } from '../../button';
import { PaTranslateModule } from '../../translate';

@Directive({
  selector: 'pa-accordion-item-body',
  standalone: true,
})
export class AccordionBodyDirective {}

@Directive({
  selector: 'pa-accordion-item-extra-description',
  standalone: true,
})
export class AccordionExtraDescriptionDirective {}

@Component({
  selector: 'pa-accordion-item',
  standalone: true,
  imports: [PaButtonModule, PaTranslateModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);

  @Input({ required: true }) id = '';
  @Input({ required: true }) itemTitle = '';
  @Input() description = '';
  @Input({ transform: booleanAttribute }) expanded = false;

  @Output() expandedChange = new EventEmitter<boolean>();

  @ContentChild(AccordionBodyDirective, { read: ElementRef }) itemContent?: ElementRef;
  @HostBinding('class.pa-accordion-collapsed') get collapsed() {
    return !this.expanded;
  }

  ngAfterViewInit() {
    this.updateContentHeight();
  }

  toggleAccordion() {
    this.expandedChange.emit(!this.expanded);
  }

  updateContentHeight() {
    setTimeout(() => {
      this.elementRef.nativeElement.style.setProperty(
        '--contentHeight',
        `${this.itemContent?.nativeElement.getBoundingClientRect().height}px`,
      );
      this.cdr.detectChanges();
    });
  }
}
